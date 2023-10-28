---
title: clipboard剪切板实现学习
date: 2023-03-15
---
## 仓库地址
https://github.com/Tandayuan/clipboard-study
## 学习参考
+ 参考仓库地址：https://github.com/zenorocha/clipboard.js

## 学习目标
+ [x] 理解ts的`namespace` `declare`及应用
+ [x] 理解ts的`模块`概念 
+ [x] 理解一些陌生的dom/bomApi, 例：`window.scrollY` `document.documentElement.scrollTop` `document.dir` `document.execCommand` `document.queryCommandSupported()` `HTMLInputElement.select()` `HTMLInputElement.setSelectionRange()` 
+ [x] `tsconfig.json`常用配置理解 
+ [x] 项目的实现思路 
+ [x] 学习js选中一段文本 Selection和Range知识的应用 
+ [x] 应用自定义事件的订阅和派发 
+ [x] ts中`class`的类型定义和应用 
+ [x] 移除事件监听器的另一种实现方式 
+ [x] vite+ts+jest环境配置项目路径别名 
+ [x] 了解ts关于`class`类型语法 
+ [x] 学习jest操作dom 
+ [x] 学习jest的配置，进行单个测试模块 
+ [x] 学习github的markdown指南
+ [ ] ts声明文件的生成配置以及发布npm包后的引用配置

## 实现思路

+ 构造一个类，触发元素与它的实例对象绑定。触发元素通过`data-xx`属性标识自定义属性。
+ 自定义属性定义了目标元素、目标文字、活动类型的字段属性。触发元素派发点击事件，可以获取到目标元素中文本的内容。目标文字是一段预设好的文本，触发元素派发点击事件就能获取。活动类型字段决定了是复制/剪切行为。

## `namespace` `declare`的理解
+ 参考文章：https://vue3js.cn/interview/typescript/namespace_module.html
+ 理解`namespace`: 命名空间一般用于解决标识符的重名问题，ts项目中正常开发不会用到，大多用于`*.d.ts`的标记文件。
+ 理解`declare`: 一般定义在`*.d.ts`标记文件里。参考文章：[TypeScript 作为 JavaScript 的超集，在开发过程中不可避免要引用其他第三方的 JavaScript 的库。虽然通过直接引用可以调用库的类和方法，但是却无法使用TypeScript 诸如类型检查等特性功能。为了解决这个问题，需要将这些库里的函数和方法体去掉后只保留导出类型声明，而产生了一个描述 JavaScript 库和模块信息的声明文件。通过引用这个声明文件，就可以借用 TypeScript 的各种特性来使用库文件了](https://www.runoob.com/typescript/ts-ambient.html)

## ts的`模块`概念
+ 理解：ts文件中的变量、函数等标识符前没有`export`声明，会被当做全局标识符看待，在另一个文件引用相同名称时就会引发错误。
ts文件应当被当成一个模块去引用，防止以上情况出现。
+ 参考文章：https://vue3js.cn/interview/typescript/namespace_module.html

## `tsconfig.json`常用配置理解

```json
{
  "compilerOptions": {
// target 的配置将会改变哪些 JS 特性会被降级，而哪些会被完整保留 例如，如果 target 是 ES5 或更低版本，箭头函数 () => this 会被转换为等价的 函数 表达式。
    "target": "ESNext",
// TypeScript 包括一组默认的内建 JS 接口（例如 Math）的类型定义，以及在浏览器环境中存在的对象的类型定义（例如 document）。 TypeScript 还包括与你指定的 target 选项相匹配的较新的 JS 特性的 API。例如如果target 为 ES6 或更新的环境，那么 Map 的类型定义是可用的。
    "lib": ["ESNext", "DOM"],
// 此标志用作迁移到即将推出的类字段标准版本的一部分。也就是使用ECMA制定的Class特性的版本。
    "useDefineForClassFields": true,
// 设置程序的模块系统;ESNext目前使用的是ESModule;
    "module": "ESNext",
// 指定模块解析策略，TS文件中的导入导出行为将会按照Node的规范来解析。例：import m from 'mitt-study' ts会寻找node_modules文件夹下的相关依赖。
    "moduleResolution": "Node",
// strict 标志启用范围广泛的类型检查行为，从而更强有力地保证程序的正确性。
    "strict": true,
// 启用生成 sourcemap files
    "sourceMap": true,
// ts文件模块允许导入.json后缀的文件
    "resolveJsonModule": true,
// https://www.typescriptlang.org/zh/tsconfig#isolatedModules 暂时不理解，暂时理解为配合vite而启用的一个字段。
    "isolatedModules": true,
// esModuleInterop为false时，在ts使用esmodule的导入/导出模块，在ts编译后这个模块会被当作CommonJS/AMD/UMD对待，导致一些规范和语法上的错误。开启后，esmodule可以在编译后修复规范和语法上的错误。
// 参考：https://www.typescriptlang.org/zh/tsconfig#esModuleInterop
    "esModuleInterop": true,
// 禁止ts编译器生成文件，例如 JavaScript 代码，source-map 或声明。生成文件的功能交由其他工具实现，例如：vite。ts编译器只做为提供编辑器集成的工具或者对源码进行类型检查的工具。
    "noEmit": true,
// 报告未使用的局部变量的错误。
    "noUnusedLocals": true,
// 报告函数中未使用参数的错误。
    "noUnusedParameters": true,
// 启用后，TypeScript 将检查函数中的所有代码路径以确保它们返回值。
    "noImplicitReturns": true,
// 跳过声明文件(*.d.ts)的类型检查。
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts", "tests/**/*.test.ts", "**.ts"]
}
```

## js选中一段文本 涉及：Selection和Range知识的应用

+ 参考文章：https://juejin.cn/post/7047022519294885924
+ [MDN：创造区域](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createRange)
+ [MDN：选区中增加区域](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/addRange)

+ 思路：选区对象(Selection)中手动增加一个区域(selection.addRange(Range))，区域对象(Range)中设置选中一段目标文本(document.createRange())。

## 陌生的dom/bomApi

+ `window.scrollY` `document.documentElement.scrollTop`：`pageYOffset` 属性是 `scrollY` 属性的别名，都是返回当前页面的滚动条纵坐标位置。没有纵向滚动条时为0

+ `document.dir` ：Document.dir 的本质是 DOMString，代表了文档的文字朝向，是从左到右 (默认) 还是从右到左。'rtl'(right to left) 代表从右到左，'ltr'(left to right) 代表从左到右。

+ `document.execCommand` ：执行一些dom特有的命令，如复制/剪切。详情：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand

+ `document.queryCommandSupported()`：

+  `HTMLInputElement.select()`：HTMLInputElement.select() 方法选中一个 <textarea> 元素或者一个带有 text 字段的 <input> 元素里的所有内容。

+ `HTMLInputElement.setSelectionRange()`：HTMLInputElement.setSelectionRange 方法用于设定<input> 或 <textarea> 元素中当前选中文本的起始和结束位置。`setSelectionRange` 方法只能应用于type为文本、搜索、链接、电话号码和密码的输入。

+ `HTMLInputElement.select()`与`HTMLInputElement.setSelectionRange()`区别：前者只能全选、后者可以指定起始与结束的索引选中
+ `document.queryCommandSupported()`：Document.queryCommandSupported() 方法确定浏览器是否支持指定的编辑指令。

## 移除事件监听器的另一种实现方式

+ 添加事件监听器时，第三个参数对象中加入`signal `字段，字段值是`AbortSignal`对象，通过`AbortController`对象的属性生成。移除事件监听器，调用`AbortController`对象的`abort()`即可。

+ 代码片段：

  ```typescript
  // 添加事件监听器
  this.abortController = new AbortController()
  triggerElement.addEventListener("click", (e: Event) => this.onClick(e), {
      signal: this.abortController.signal
  })
  // 移除事件监听器
  this.abortController?.abort()
  ```


## vite+ts+jest环境配置项目路径别名

+ 编译阶段识别路径别名：配置`tsconfig.json`

  ```json
  "compilerOptions": {
      "baseUrl": ".",
      "paths": {
          "@/*": ["src/*"],
          "lib/*": ["lib/*"]
      }
  }
  ```

+ 打包阶段识别路径别名：配置`vite.config.ts`

  ```typescript
  {
      resolve: {
        alias: { "@": _resolve("src"), lib: _resolve("lib") }
      }
  }
  ```

+ 测试阶段识别路径别名：配置`jest.config.cjs`

  ```js
  module.exports = {
      moduleNameMapper: {
          "^@/(.*)$": "<rootDir>/src/$1",
          "^lib/(.*)$": "<rootDir>/lib/$1",
      },
  }
  ```


## jest配置选项学习

+ [参考文章的评论](https://qastack.cn/programming/42827054/how-do-i-run-a-single-test-using-jest)

## 了解ts`class`语法

[ts相关文档](https://www.typescriptlang.org/docs/handbook/2/classes.html)

## 学习github的markdown指南

> tips：除了markdown知识外还有很多关于github的知识可以学习

[学习链接](https://docs.github.com/zh/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

## ts声明文件的生成配置以及发布npm包后的引用配置

> package.json 关键配置解析

```json
"types": "./types/main.d.ts", // npm寻找库声明文件的入口
"files": [
    "dist_lib", // 打包后的库文件夹
    "types" // 声明文件文件夹
    // 以上都表示在根目录上的文件夹
 ],
"exports": {
    "types": "./types/main.d.ts", // 声明文件导入指向路径
    "import": "./dist_lib/tdyClipboard.js", // esModule导入指向路径
    "require": "./dist_lib/tdyClipboard.umd.cjs" // commonJs导入指向路径
},
"scripts": {
    "buildDeclaration": "tsc --project tsconfig.lib.json", // 运行tsconfig.lib.json导出项目声明文件夹
    "buildLib": "tsc && vite build --mode lib && pnpm run buildDeclaration" // 顺序执行：检查ts所有文件是否可以通过编译 && vite构建打包 && 执行buildDeclaration脚本
}
```

> tsconfig.lib.json

```json
{
    "extends": "./tsconfig.json", // 继承tsconfig.json的配置
    // 以下配置覆盖继承的相同字段的配置 等同于 Object.assign(tsconfig.json, 以下配置)
    "compilerOptions": {
        "noEmit": false, // 编译完成后能够生成js文件、声明文件等
        "emitDeclarationOnly": true, // 应用此配置编译后只会生成声明文件
        "declaration": true, // 允许生成声明文件
        "declarationDir": "./types" // 声明文件存放在根目录的types文件夹中
    },
    "include": ["lib/**/*.ts"] // 只编译生成include指定的声明文件
}
```

## 发布库包到npm

> 配置好以上配置文件后，执行`pnpm buildLib `会生成`types`、`dist_lib`两个文件夹。
>
> 执行以下命令：
>
> + `npm version patch` package.json里的version自增一位并commit到git的暂存区
> + `npm login` 登录npm
> + `npm publish` 发布npm包

