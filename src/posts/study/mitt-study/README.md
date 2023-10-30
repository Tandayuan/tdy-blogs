---
title: miit发布订阅学习
date: 2023-03-03
dir:
  link: true
---
## 仓库地址
https://github.com/Tandayuan/mitt-study
## 学习参考文章

https://juejin.cn/post/7084984303943155719

## 学习目标

+ 学习typescript有关数组的知识，如：`T[keyof T]`
+ 学习typescript有关断言的知识：` as ` 和 `!`
+ 学习`unknown`、`interface`相关知识
+ 学习位运算在实战中的作用
+ jest的模拟函数学习和应用

## 断言知识

配合食用文章：https://juejin.cn/post/6981112029100802085

断言是开发者比ts更清楚这个变量的类型，在代码中主观断定具体类型。

`!`在变量后面，表示断定这个变量是非`undefined | null`的

`变量 as 类型`，标识断定这个变量是这个类型的。

## 数组知识

配合食用文章：https://juejin.cn/post/7023238396931735583

## `unknown`

`unknown`类型表示任何值。这类似于 any 类型，但更安全，因为用未知值做任何事情都是不合法的。

原文地址：https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown

`interface`与`type`的区别：

https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces

## 位运算

+ 负数的位运算：https://blog.csdn.net/king_msky/article/details/17221973

```markdown
// 位运算解释：https://www.jianshu.com/p/588eb74b5a03
// typeHandlers.indexOf(handler)找不到索引时为-1，会删除typeHandlers的最后一位元素。
// -1 >>> 0位运算得到一个极大的正整数，防止typeHandlers被误删。
// ps: (-1 >>> 0) === 4294967295
```

## jest的模拟函数学习

https://jestjs.io/docs/mock-functions