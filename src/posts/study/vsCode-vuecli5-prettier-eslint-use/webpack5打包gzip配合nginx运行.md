# webpack5打包gzip配合nginx运行

## 先决条件

+ linux环境安装有nginx，并且可以正常运行。
+ vue-cli5 + webpack5的操作环境。

## webpack5配置

+ 下载压缩gzip格式插件`npm i compression-webpack-plugin -D`

+ `vue.config.js`

  ```javascript
  // Prepare compressed versions of assets to serve them with Content-Encoding.
  const { defineConfig } = require('@vue/cli-service')
  const CompressionPlugin = require("compression-webpack-plugin");
  module.exports = defineConfig({
     chainWebpack(config){
       // 生成.gz格式的打包文件；配合nginx的gzip识别功能，大幅压缩包体积大小加快请求速度。
         config
             .plugin('compression-plugin')
             .use(CompressionPlugin, [{ test: /\.js$|\.html$|\.css/, threshold: 10240, deleteOriginalAssets: true }])
     } 
  })
  ```

## nginx服务器配置（假设服务器已正常运行前端项目资源）

+ 相关配置说明文档：[Module ngx_http_gzip_static_module](https://nginx.org/en/docs/http/ngx_http_gzip_static_module.html)
+ 服务器上nginx配置：`gzip_static on;`
+ `gzip_static on;`个人理解：优先识别和运行项目目录下.gz结尾的包，没有的按正常文件形式运行。

## win11上安装linux和运行nginx

+ 配置运行环境：win11`WSL`的Linux发行版本系统`Ubuntu`（WSL的安装参照[微软相关文档](https://learn.microsoft.com/zh-cn/windows/wsl/install)）
+ `Ubuntu`安装`nginx`命令：
  + `sudo add-apt-repository ppa:nginx/stable`
  + `sudo apt-get update`
  + `sudo apt-get install -y nginx`

+ 启动`nginx`命令：
  + `sudo service nginx start`
  + win11浏览器运行`http://localhost`查看nginx默认html页面显示出来代表启动成功。

+ 以上步骤参考大佬文章[如何在 Windows 10 中使用WSL安装 Nginx](https://juejin.cn/post/6956145078612000776)

## nginx本地开发配置和gzip运行项目(重点)

+ 参考大佬文章：

  [[Nginx前端入门](https://segmentfault.com/a/1190000041492323)](https://segmentfault.com/a/1190000041492323#item-0-15)

  [Linux vi/vim](https://www.runoob.com/linux/linux-vim.html)

  [将Windows系统中文件传入WSL子系统中](https://blog.csdn.net/ouyangk1026/article/details/125300749)

```shell
cd /etc/nginx/
sudo vim nginx.conf
# nginx.conf参照上文`nginx服务器配置`,配置好了保存退出。
cd conf.d/
sudo touch front.conf
sudo vim front.conf 
# front.conf中插入以下配置:
server {
 listen 8080;
 server_name localhost;
 location / {
  root /usr/share/nginx/dist;
  index index.html;
 }
}
# end 保存退出
# 前端项目打包好的dist文件夹及它的文件复制一份到/usr/share/nginx路径下
sudo cp -r /mnt/d/mgsoft-leasing-platform/vue-element-admin-master/dist/ /usr/share/nginx/
# 重启nginx
sudo nginx -s reload
# 访问浏览器查看效果：http://localhost:8080
```

+ 验证gzip是否开启：访问项目->F12-网络->单击大于1kb的js文件的标头

+ `app.hash.js`示例：

  ```
  响应标头：
  Content-Encoding: gzip
  请求标头：
  Accept-Encoding: gzip, deflate, br
  ```

  都包含gzip说明nginx成功配置了gzip！