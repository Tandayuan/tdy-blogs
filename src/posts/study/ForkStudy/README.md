---
date: 2023-05-13
---
# Fork仓库指南

## 仓库地址
https://github.com/Tandayuan/ForkStudy


## 参考文章

> [GitHub Pull request 并且与「原仓库」同步解决代码冲突](https://zhuanlan.zhihu.com/p/337949346)
>
> [git同步fork仓库同步upstream仓库](https://blog.csdn.net/weixin_43923436/article/details/121613677)

## 学习目标

+ fork仓库以及提出Pull Request。
+ 仓库主分支同步fork仓库代码的更新。
+ 仓库创建新分支，同步主分支代码和维护新分支专属代码不与主分支冲突。

## fork仓库以及提出Pull Request

>  fork仓库地址：https://github.com/iPeiPig/TestFork

### fork仓库

+ 浏览器打开fork仓库地址，点击右上角的Fork按钮。

  ![image-20230513132316325](images/Fork指南/image-20230513132316325.png)

+ 本地克隆仓库`git clone https://github.com/Tandayuan/ForkStudy`

### 提出Pull Request

+ 本地仓库修改README.md文件、提交到远程仓库。

  ![image-20230513132818679](images/Fork指南/image-20230513132818679.png)

+ 在GitHub提出Pull Request

  检查到没有代码冲突，Pull Request成功，等待Fork仓库管理员审核通过，Fork仓库就会显示刚才提交的代码。

  ![image-20230513133011995](images/Fork指南/image-20230513133011995.png)

  ![image-20230513133038327](images/Fork指南/image-20230513133038327.png)

+ 模拟管理员审核通过刚才的Pull Request

  ![image-20230513133324750](images/Fork指南/image-20230513133324750.png)

  ![image-20230513133356884](images/Fork指南/image-20230513133356884.png)

  同意以后Fork仓库就会出现审核通过的代码：

  ![image-20230513133434963](images/Fork指南/image-20230513133434963.png)

## 仓库主分支同步fork仓库代码的更新

如果fork仓库作者做出了代码变动，我们可以通过设置upstream的方式手动同步更新仓库中的代码，保持一致。

+ 模拟fork仓库作者更新代码：

  ![image-20230513133925622](images/Fork指南/image-20230513133925622.png)

+ 本地仓库设置upstream(上游仓库)：

  + 查看远程仓库状态，如果只有如下两条记录，说明本地仓库没有设置upstream：

  ![image-20230513134343597](images/Fork指南/image-20230513134343597.png)

  + 设置upstream为fork仓库：

  ![image-20230513134511585](images/Fork指南/image-20230513134511585.png)

+ 拉取和合并upstream仓库的代码到本地仓库：

  + 拉取：fork仓库的main分支代码已经拉取到本地的上游仓库main分支

  ![image-20230513134812250](images/Fork指南/image-20230513134812250.png)

  + 合并：上游仓库main分支的代码合并到本地仓库的main分支中，可以看到本地仓库代码发生变化

  ![image-20230513134927561](images/Fork指南/image-20230513134927561.png)

+ 本地仓库推送代码到远程仓库：

  ![image-20230513135116729](images/Fork指南/image-20230513135116729.png)

+ 远程仓库查看代码已经更新：

  ![image-20230513135338524](images/Fork指南/image-20230513135338524.png)

## 仓库创建新分支，同步主分支代码和维护新分支专属代码不与主分支冲突

### 本地仓库创建新分支

+ 分支名称：patch；创建并切换到patch分支；

![image-20230513135752371](images/Fork指南/image-20230513135752371.png)

![image-20230513135833505](images/Fork指南/image-20230513135833505.png)

+ 推送本地新建分支到远程仓库：

  ![image-20230513140918610](images/Fork指南/image-20230513140918610.png)

  ![image-20230513140945022](images/Fork指南/image-20230513140945022.png)

### 同步主分支代码到新分支

+ 由于主分支代码和fork仓库的主分支代码保持一致，所以需要按上述步骤模拟fork仓库更新。

  ![image-20230513140435071](images/Fork指南/image-20230513140435071.png)

+ 切换到本地仓库主分支更新代码：

  ![image-20230513140547113](images/Fork指南/image-20230513140547113.png)

  ![image-20230513140705723](images/Fork指南/image-20230513140705723.png)

+ 切换到新分支合并主分支代码：

  ![image-20230513141034886](images/Fork指南/image-20230513141034886.png)

+ 推送本地仓库新分支代码到远程仓库新分支：

  ![image-20230513141253438](images/Fork指南/image-20230513141253438.png)

  ![image-20230513141310903](images/Fork指南/image-20230513141310903.png)

### 维护新分支专属代码不与主分支冲突

+ 修改本地仓库新分支代码：

  ![image-20230513141759206](images/Fork指南/image-20230513141759206.png)

+ 推送到远程仓库，更新新分支代码：

  ![image-20230513141955688](images/Fork指南/image-20230513141955688.png)

+ 模拟主分支更新同一行代码：

  ![image-20230513143007271](images/Fork指南/image-20230513143007271.png)

  ![image-20230513143039240](images/Fork指南/image-20230513143039240.png)

+ 新分支合并主分支代码引发冲突，选择保留当前更改解决冲突：

  ![image-20230513143213275](images/Fork指南/image-20230513143213275.png)

  ![image-20230513143248415](images/Fork指南/image-20230513143248415.png)

+ 再次commit解决冲突，推送更新远程仓库patch分支代码：

  ![image-20230513144100693](images/Fork指南/image-20230513144100693.png)

  ![image-20230513144238269](images/Fork指南/image-20230513144238269.png)