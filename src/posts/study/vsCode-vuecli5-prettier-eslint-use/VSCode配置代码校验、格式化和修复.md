# 项目代码风格统一：eslint、prettier + VSCode

## 操作版本

> npm 7.21.1  node 16.9.1
>
> "@babel/core": "^7.12.16"  "@babel/eslint-parser": "^7.12.16"  "eslint": "^7.32.0"  "eslint-config-prettier": "^8.3.0"
>
> "eslint-plugin-prettier": "^4.0.0"  "eslint-plugin-vue": "^8.0.3"  "prettier": "^2.4.1"  "husky": "^8.0.3" 
>
> "lint-staged": "^13.1.2" 

## npm依赖包

```
npm i @babel/eslint-parser @babel/core eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue prettier -D
```

## VSCode插件

`ESLint`：ESLint插件在编辑器中高亮显示和修复支持文件类型的错误（需要项目中安装eslint包）；

`Vetur`：vue文件语法高亮、配合ESLint插件在编辑器中高亮显示和修复vue文件的错误；

## VSCode配置文件（组合ESLint、Vetur插件保存后lint和fix代码）

`根目录/.vscode/settings.json`，如无手动新建。

```json
{
    // 保存开启代码格式化
    "editor.codeActionsOnSave": {
        "source.fixAll": true
    },
    // 默认的编辑器格式化代码工具指定：eslint；结合eslint-plugin-prettier插件使用，在保存的时候还会自动调用本地npm包里的prettier的格式化代码命令；
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
    // 与Vetur高亮错误提示结合，开启后Eslint的报错可视化反馈在编辑器。
    "eslint.enable": true,
    // eslint去验证的文件
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "vue"
    ],
    // eslint控制台显示信息
    "eslint.trace.server": "verbose",
    // 关闭vetur插件自带的vue的template代码校验，交给本地eslint+prettier校验。
    "vetur.validation.template": false,
    // 关闭vetur代码格式化功能，交给本地eslint+prettier校验。
    "vetur.format.enable": false,
}
```

## 项目配置ESLint + Prettier

`根目录/.eslintrc`

```js
module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/essential', 'eslint:recommended', 'plugin:prettier/recommended'],
    parserOptions: {
        parser: '@babel/eslint-parser',
    },
    rules: {
        'prettier/prettier': [
            'error',
            {
                semi: false, // 末尾不加分号
                singleQuote: true, // 单引号
                tabWidth: 4, // 代码缩进4个单位
                useTabs: false, // 缩进单位：空格
                endOfLine: 'auto', // 换行符自动判断，兼容不同代码环境。 crlf win lf mac
                htmlWhitespaceSensitivity: 'ignore', // 忽略html标签中的空格存在
                printWidth: 120, // 单行代码总数超过120个字符就换行
            },
        ],
        'no-unused-vars': ['error', { args: 'none' }], // 不检查方法未使用的参数
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
}
```

### 忽略lint某个路径/文件配置：

`根目录/.eslintignore`

```js
build/*.js
src/assets
public
dist
vue.config.js
```

## 上传VSCode配置文件到Git

`根目录/.gitignore`

```
.vscode/*
!.vscode/settings.json
```

## 使用方法

+ VSCode保存文件后即可出现解决不了的错误(需要手动修复)和自动修复可以解决的错误。

+ 其他编辑器在命令行操作

  ```bash
  npx eslint --ext .js,.vue --fix .\src\views\Report\testview.vue
  ```

## husky+lintstaged规范化暂存区代码

### 安装npm包

[husky文档](https://typicode.github.io/husky/getting-started.html)

[lint-staged文档](https://www.npmjs.com/package/lint-staged)

```bash
npm i husky lint-staged -D
npx husky install // 生成本地husky目录，存储git钩子脚本。
npm pkg set scripts.prepare="husky install" // scripts中添加"prepare": "husky install"
```

### 测试husky的pre commit钩子执行`npm test`脚本

```bash
npx husky add .husky/pre-commit "npm test" // 编写pre commit脚本,git commit提交触发执行`npm test`脚本
git add .husky/pre-commit
git commit -m "Keep calm and commit" // 如果 npm test 命令失败，您的提交将自动中止，代表测试通过。
```

### 编写lint-staged脚本，交给husky执行。

+ 编写lint-staged脚本：

`根目录/.lintstagedrc`

```json
{
    "src/**/*.{vue,js}": ["eslint --ext .vue,.js --fix"] // 如果插入在pre-commit脚本，lintstaged检索暂存区符合src/**/*.{vue,js}条件的文件执行数组中的eslint脚本。
}
```

`package.json`

```json
{
    "scripts": {
        "lint-staged": "lint-staged" // 执行.lintstagedrc文件中的脚本
    }
}
```

+ husky写入lint-staged脚本：`根目录/.husky/pre-commit`

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

## npm test
npm run lint-staged
```

### 测试husky的pre commit钩子执行`npm run lint-staged`脚本

+ 暂存区中存放一个没有格式化的文件`test1.vue`，add区中存在一个没有格式化的文件`test2.js`
+ 执行git commit操作
+ 成功条件：`test1.vue`被格式化后提交成功或者控制台显示lint报错信息后提交失败，`test2.js`没有变化。

> **ps: 如果test1.vue格式化后的文件与作出修改前一致会出现不允许empty commit的报错**
>
> 建议修改lint-staged脚本，只让脚本lint代码，不让脚本修复代码防止以上错误出现：
>
> ```json
> {
>     "src/**/*.{vue,js}": ["eslint --ext .vue,.js"] // 如果插入在pre-commit脚本，lintstaged检索暂存区符合src/**/*.{vue,js}条件的文件执行数组中的eslint脚本。
> }
> ```
>
> 
