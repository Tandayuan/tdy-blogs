# uniapp实现小程序多图片上传与报错续传

## 实现目标

uniapp实现微信小程序多图片同时上传、对上错失败的图片发出提示重新续传、上传成功的图片预览。

**借助uni-cloud上传云存储API实现后端功能**

## 实现代码

```html
<view class="btn-list">
    <button type="primary" plain @click="upload">选择文件“后”上传</button>
    <text class="tips">先调用chooseImage选完文件/图片/视频后用uploadFile方法上传</text>
</view>
<view>图片预览区</view>
<view class="imgBox">
    <template v-for="(item, index) in imgUrlList" :key="item.fileID">				
        <view style="width: 300rpx;height: 300rpx;">
            <image :src="item.filePath" style="width: 100%;height: 100%;"></image>
        </view>
    </template>
</view>
```

```js
data() {
    return {
        imgUrlList: []
    },
},
```

```js
upload() {
    new Promise((resolve, reject) => {
        // 选择图片API
        uni.chooseImage({
            count: 8,
            success: res => {
                // #ifndef H5
                const tempList = []
                async function getImageInfo(path, index){
                    return new Promise((res, rej)=> {
                        uni.getImageInfo({
                            src: path,
                            success(info) {
                                const options = {
                                    filePath: path,
                                    cloudPath: `${Date.now()}tdy${index}` + '.' + info.type.toLowerCase()
                                }
                                res(options)
                            },
                            fail(err) {
                                rej(new Error(err.errMsg || '未能获取图片类型'))
                            }
                        })
                    })
                }
                const pList = res.tempFilePaths.map((path, index)=> getImageInfo(path, index))
                Promise.all(pList).then(res=>{
                    resolve(res)
                }).catch(err=> {
                    reject(err)
                })
                // #endif
            },
            fail: () => {
                reject(new Error('Fail_Cancel'))
            }
        })
    }).then(async (optionsList) => {
        async function uploadFile(options, index, isFlag = true){
            try{
                // 模拟失败测试场景：上传4个图像文件会提示上传失败两次
                if(isFlag &&(index === 1|| index === 2)) throw new Error(`ErrorFileIndex:${index}`)
                const res = await uniCloud.uploadFile({
                    ...options,
                    onUploadProgress: function(progressEvent) {

                    }
                })
                return res;
            }catch(e){
                return [index, e];
            }
        }
        async function handleManyFileUpload(optionsList = [], isFlag = true, successResList = []){
            count--;
            if(count < 0) isFlag = false
            return new Promise(async(aResolve, aReject)=>{
                uni.showLoading({
                    title: '文件上传中...'
                })
                const tList = await Promise.all(optionsList.map((options, index)=> uploadFile(options, index, isFlag)))
                // 验证是否存在上传失败的数组
                const validateList = tList.reduce((pre, cur)=> {
                    if(Array.isArray(cur) && typeof cur[0] === 'number'){
                        // 失败
                        pre[1].push(optionsList[cur[0]]) // 失败文件索引
                        pre[2].push(cur[1]) // 失败文件报错对象
                    }else {
                        // 成功
                        pre[0].push(cur)
                    }
                    return pre
                }, [[], [], []])
                console.log('SuccessOrFailList', validateList);
                uni.hideLoading()
                if(validateList[1].length > 0){
                    // 模拟提示有上传失败的文件，点确定执行重新上传逻辑。
                    uni.showModal({
                        title: '错误提示',
                        content: `${validateList[1].length}个图像文件上传失败，是否重新上传？`,
                        async success(res) {
                            const temp = [...successResList, ...validateList[0]];
                            // 不断地递归尝试重新上传失败的文件
                            if (res.confirm) {											
                                console.log('重新上传尝试~');
                                const r = await handleManyFileUpload(validateList[1], isFlag, temp)
                                aResolve(r)
                            }
                            // 放弃重新上传失败的文件
                            else {
                                aResolve([temp, validateList[2]])
                            }
                        }
                    });
                }else {
                    const res = [...successResList, ...validateList[0]];
                    console.log('上传结束了~');
                    aResolve([res, validateList[2]])
                }
            })
        }
        let count = 2;
        const [successFileList, failErrorList] = await handleManyFileUpload(optionsList)
        // [上传图片成功返回的对象数组，上传图片总数, 上传失败错误对象数组]
        return [successFileList, optionsList.length, failErrorList]
    }).then(resList => {
        const [successFileList, allFileCount, failErrorList] = resList;
        uni.hideLoading()
        uni.showModal({
            content: `图片上传成功！成功条目：${successFileList.length}/${allFileCount}`,
            showCancel: false
        })
        // 预览上传成功的图片
        this.imgUrlList = successFileList
        if(failErrorList.length > 0){
            // 控制台记录错误对象，如有需要可直接抛出错误给catch处理；
            console.error("failErrorList", failErrorList);
        }
    }).catch((err) => {
        uni.hideLoading()
        console.log(err);
        if (err.message !== 'Fail_Cancel') {
            uni.showModal({
                content: `图片上传失败，错误信息为：${err.message}`,
                showCancel: false
            })
        }
    })
}
```

## 实习效果

### 报错后断点续传到成功

![报错后一直续传](https://raw.githubusercontent.com/Tandayuan/imagesRepo/main/img/202312072208951.gif)

### 报错后断点续传1次后取消

![报错后断点续传1次后取消](https://raw.githubusercontent.com/Tandayuan/imagesRepo/main/img/202312072208953.gif)