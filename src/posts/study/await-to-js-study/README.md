---
date: 2023-06-04
dir:
  link: true
---
# vscode-vite-ts-eslint-prettier-jest-pnpm框架学习

## 仓库地址
https://github.com/Tandayuan/await-to-js-study

## 学习参考项目

[scopsy/await-to-js - GitHub1s](https://github1s.com/scopsy/await-to-js)

## 学习完成目标：

1. 运用 pnpm 作为包管理器。✔
2. pnpm 全局包安装注意事项 ✔
3. nodeJs 作为环境构建。✔
4. 上传到 github ✔
5. ts 实现, 理解 promise 在 ts 的运用。✔
6. 使用 eslint 、eslint 配置文件详解。vscode 的 eslint 插件。✔
7. Prettier 的使用。vscode 的 Prettier 插件。✔
8. Eslint Prettier 一起使用的兼容问题说明。✔
9. Eslint Prettier Typescript JavaScript 一起使用的配置。✔
10. 运用 jest 测试。✔
11. vite 打包, 支持 npm 引入使用。✔
12. 发布到 npm 网上。✔
13. 做好笔记。✔

## pnpm 安装与配置

[配合食用：PNPM 设置全局包路径 - 掘金 (juejin.cn)](https://juejin.cn/post/7158295493812944904)

[安装 | pnpm 中文文档 | pnpm 中文网](https://www.pnpm.cn/installation)

- 推荐 npm 安装

- 修改 pnpm 的仓库路径、全局路径

  - 配置文件地址：`C:\Users\电脑名称\.npmrc`，往里添加。

  - global-dir-bin 中的地址要在环境变量 Path 添加一份
  - 以上完成后, 运行命令：`pnpm i -g pnpm`和`pnpm i -g`，重新安装 pnpm 应用以上配置。

  ```powershell
  #pnpm全局仓库路径
  store-dir=D:\.pnpm\store
  cache-dir=D:\.pnpm\cache
  state-dir=D:\.pnpm\state
  #pnpm全局安装路径
  global-dir=D:\.pnpm\global
  global-dir-bin=D:\.pnpm\bin
  ```

## ESLint 的安装与配置

[ESlint 官网 Getting Started](https://eslint.org/docs/latest/use/getting-started)

[配合食用：VSCode 插件之 ESLint - 掘金 (juejin.cn)](https://juejin.cn/post/6926456864276873230)

[配合食用：ESLint 配置详解(一) - 超级深入详细 - 简书 (jianshu.com)](https://www.jianshu.com/p/6254093f846c)

[配合食用：ESLint 配置详解(二) - 常用规则(Rules)集合 - 简书 (jianshu.com)](https://www.jianshu.com/p/1e42e289751e)

- pnpm 安装 eslint 到项目
- 项目根目录 cli 方式自动建立或手动建立配置文件`.eslintrc.js`
- `.eslintrc.js`添加好规则后，只能在控制台发现问题和命令方式解决问题`eslint --fix xx.js`

- 下载 vscode 的插件`eslint`可以在编辑器中出现高亮报错提示，`settings.json`中配置保存 eslint 自动修复错误。

  `settings.json`

  ```json
  // 开启vscode eslint插件 eslint规则报错高亮提示
  "eslint.enable": true,
  //编辑器保存时自动将代码按ESLint格式进行修复
  "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
  },
  ```

## Prettier 安装与配置

[Install · Prettier 官网](https://prettier.io/docs/en/install.html)

[配合食用：VSCode 插件之 Prettier - 掘金 (juejin.cn)](https://juejin.cn/post/6914549928131821576)

- pnpm 安装到项目，创建`.prettierrc`配置文件

- 没有安装 prettier 到项目, vscode 安装有 prettier 插件，遵循以下规则：

  ```markdown
  无 npm 包+无配置文件 = vscode-prettier 内置配置 + vscode 的 setting.json 配置
  有 npm 包+无配置文件 = vscode-prettier 内置配置 + vscode 的 setting.json 配置
  无 npm 包+有配置文件= vscode-prettier 内置配置 + 本地配置
  有 npm 包+有配置文件= npm 包配置 + 本地配置
  ```

- `.prettierrc`添加好规则后，只能在控制台发现问题和命令方式解决问题`npx prettier --write .`

- 下载 vscode 的插件`prettier`可以在编辑器中出现高亮报错提示，`settings.json`中配置保存 prettier 自动修复错误。

  `settings.json`

  ```json
  "prettier.enable": true // 控制是否启用 vscode-prettier 插件。当你改变这个设置时，你必须重新启动 VSCode。
  "prettier.resolveGlobalModules": false // 启用后，如果没有本地依赖，该插件将尝试使用全局 npm 或 yarn 模块。
  // 编辑器开启保存后自动格式化，所有文件的格式化工具为prettier
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // 也可以只设置 javascript 的默认格式化工具为 prettier
  "[javascript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true, // 保存的时候自动格式化
  },
  // 以上是vscode-prettier特有的配置属性, 与prettier本身没有任何关系。
  /*
  * 因为vscode-prettier内置了prettier的缘故, 甚至可以在settings.json中配置prettier的规则。
  * 仅限项目中没有npm包和.prettierrc文件时,settings.json的prettier规则才会生效。
  */
  "prettier.semi": false, // 语句末尾添加分号
  "prettier.singleQuote": true // 使用单引号
  ```

## ESLint 和 Prettier 的组合使用

[配合食用：ESLint 之与 Prettier 配合使用 - 掘金 (juejin.cn)](https://juejin.cn/post/6924568874700505102)

- 二者组合使用产生的问题：ESLint 和 Prettier 都可以格式化代码的缘故, 格式化某些样式时产生分歧, 编辑器不知道听谁的，从而引发报错。

- 解决思路：

  - 在 ESLint 中引入一组配置, 禁用 eslint 中与 prettier 格式化中分歧的规则。

    现成的 npm 配置包：`eslint-config-prettier`

  - 在 ESLint 中插入 prettier 插件, 实现 ESLint 运行时 Prettier 也能同时运行。ESLint 主要用于 JS/TS 的代码质量检查与修复、Prettier 主要用于各种语音的代码风格统一。现成的 npm 插件包： `eslint-plugin-prettier`

- 配置文件

  `.eslintrc.js`

  ```javascript
  module.exports = {
    env: {
      commonjs: true,
      es2021: true,
      node: true,
      browser: true
    },
    extends: ["plugin:prettier/recommended"],
    overrides: [],
    parserOptions: {
      ecmaVersion: "latest"
    },
    rules: {}
  };
  ```

  `.prettierrc`

  ```json
  {
    "useTabs": false,
    "tabWidth": 2,
    "printWidth": 100,
    "singleQuote": true,
    "trailingComma": "none",
    "bracketSpacing": true,
    "semi": false
  }
  ```

  vs-code 的`settings.json`

  因为`eslint-plugin-prettier`插件让 prettier 在 eslint 中运行了, 因此开启 eslint 运行就 OK。

  ```json
  // eslint
  "eslint.enable": true,
  //保存时自动将代码按ESLint格式进行修复
  "editor.codeActionsOnSave": {
     "source.fixAll.eslint": true
  },
  ```

## ESLint Prettier TypeScript JavaScript 组合使用

- 在`ESLint和Prettier的组合使用`的基础上添加配置。

- 安装

  ```
  pnpm add -D
  @typescript-eslint/eslint-plugin @typescript-eslint/parser
  eslint prettier typescript
  eslint-config-prettier eslint-plugin-prettier
  eslint-config-airbnb-base eslint-config-standard-with-typescript
  ```

- `.eslintrc.js`配置文件

  ```javascript
  module.exports = {
    env: {
      commonjs: true,
      es2021: true,
      node: true,
      browser: true
    },
    extends: ["standard-with-typescript", "plugin:prettier/recommended"], // 'standard-with-typescript'内部overrides了ts类型相关的文件, 无需overrides。
    overrides: [
      {
        files: ["*.ts", "*.tsx"],
        parserOptions: {
          project: ["./tsconfig.json"] // 指定ts配置文件路径 不然报错
        }
      },
      {
        files: ["*.js"],
        extends: ["airbnb-base", "plugin:prettier/recommended"], // 'airbnb-base'没做js和ts兼容, 防止规则冲突单独适配js。
        rules: {
          "no-console": "off" // rules里的配置优先级大于extends
        }
      }
    ],
    parserOptions: {
      ecmaVersion: "latest"
    },
    rules: {}
  };
  ```

## Jest 安装与配置

[快速开始 · Jest 官网 (jestjs.io)](https://jestjs.io/zh-Hans/docs/getting-started)

- 安装完成后,根据 Jest 官网指引安装兼容 Typescript 的包。

  ```json
  @types/jest ts-jest
  ```

- 上一步完成后, 初始化生成 jest 配置文件： `npx jest --init`

  `jest.config.ts` 配置文件里添加 preset 属性的值

  ```typescript
  import type { Config } from "jest";
  const config: Config = {
    preset: "ts-jest" // 配置里添加预设
  };
  export default config;
  ```

- 根据 Jest 官网指引安装 Babel，babel 配置加入对应预设。完成后支持 JsModule 方式导入测试文件。

  ```json
  @babel/core @babel/preset-env babel-jest
  ```

  `babel.config.js`

  ```js
  module.exports = {
    presets: [["@babel/preset-env", { targets: { node: "current" } }]]
  };
  ```

- 安装解析`jest.config.ts`文件的包：`pnpm add -D ts-node @types/node`

- 本地创建一个文件夹`tests`，里面包含`*.test.ts`的文件用于测试

- `package.json`的 script 加入`test: jest`，开启测试~

## Vite 安装与配置

[开始 | Vite 官方中文文档 (vitejs.dev)](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)

- 安装选项选择：`lib`模式

- 生成的`tsconfig.json`的`include`追加`vite.config.ts`，为了 eslint 检测到这个文件。

- `vite.config.ts`设置了几个模式，其中`lib`模式打包构建`lib`目录文件，`dev`模式下可以在线调试运行调试项目和打包构建，`production`模式是上线模式，请求的 url 更改为线上地址。

- `package.json`增加或修改的配置：

  ```json
  "type": "module", // vite默认使用原生ES模块
  // 打包后生成静态文件库，库作为依赖被引用。不同的引用方式动态使用不同的静态包。
  // ESModule方式使用这个规则下的包："import": "./dist_lib/gracefulPromise.js"
  // CommonJs方式则是"require": "./dist_lib/gracefulPromise.umd.cjs"
  // main是兼容前两种的方式外还支持umd方式的引用
  // 有关types字段与ts提示语法相关，不做过多说明。
  "main": "./dist_lib/gracefulPromise.umd.cjs",
  "module": "./dist_lib/gracefulPromise.js",
  "exports": {
      "types": "./index.d.ts",
      "import": "./dist_lib/gracefulPromise.js",
      "require": "./dist_lib/gracefulPromise.umd.cjs"
  },
  "types": "./index.d.ts",
  // 当你的包作为依赖项安装时要包含的条目
  "files": [
      "dist_lib",
      "index.d.ts"
  ],
  ```

- `babel.config.js`和`.eslintrc.js`的后缀改为`cjs`，因为`package.json`文件声明了`type:module`，config 文件的导出模式与之冲突，改为`cjs` npm 才能识别它们是`commonJs`的导出模块，而不是`ESModule`

## 发布包到 npm

- `npm login`
- `npm publish`
