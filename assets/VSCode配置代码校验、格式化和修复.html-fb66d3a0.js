const e=JSON.parse('{"key":"v-6f975d78","path":"/posts/study/vsCode-vuecli5-prettier-eslint-use/VSCode%E9%85%8D%E7%BD%AE%E4%BB%A3%E7%A0%81%E6%A0%A1%E9%AA%8C%E3%80%81%E6%A0%BC%E5%BC%8F%E5%8C%96%E5%92%8C%E4%BF%AE%E5%A4%8D.html","title":"项目代码风格统一：eslint、prettier + VSCode","lang":"zh-CN","frontmatter":{"description":"项目代码风格统一：eslint、prettier + VSCode 操作版本 npm 7.21.1 node 16.9.1 \\"@babel/core\\": \\"^7.12.16\\" \\"@babel/eslint-parser\\": \\"^7.12.16\\" \\"eslint\\": \\"^7.32.0\\" \\"eslint-config-prettier\\": \\"^8.3.0\\" \\"eslint-plugin-prettier\\": \\"^4.0.0\\" \\"eslint-plugin-vue\\": \\"^8.0.3\\" \\"prettier\\": \\"^2.4.1\\" \\"husky\\": \\"^8.0.3\\" \\"lint-staged\\": \\"^13.1.2\\"","head":[["meta",{"property":"og:url","content":"https://tandayuan.github.io/tdy-blogs/tdy-blogs/posts/study/vsCode-vuecli5-prettier-eslint-use/VSCode%E9%85%8D%E7%BD%AE%E4%BB%A3%E7%A0%81%E6%A0%A1%E9%AA%8C%E3%80%81%E6%A0%BC%E5%BC%8F%E5%8C%96%E5%92%8C%E4%BF%AE%E5%A4%8D.html"}],["meta",{"property":"og:site_name","content":"TDYBlogs"}],["meta",{"property":"og:title","content":"项目代码风格统一：eslint、prettier + VSCode"}],["meta",{"property":"og:description","content":"项目代码风格统一：eslint、prettier + VSCode 操作版本 npm 7.21.1 node 16.9.1 \\"@babel/core\\": \\"^7.12.16\\" \\"@babel/eslint-parser\\": \\"^7.12.16\\" \\"eslint\\": \\"^7.32.0\\" \\"eslint-config-prettier\\": \\"^8.3.0\\" \\"eslint-plugin-prettier\\": \\"^4.0.0\\" \\"eslint-plugin-vue\\": \\"^8.0.3\\" \\"prettier\\": \\"^2.4.1\\" \\"husky\\": \\"^8.0.3\\" \\"lint-staged\\": \\"^13.1.2\\""}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-30T13:16:52.000Z"}],["meta",{"property":"article:author","content":"Tandayuan"}],["meta",{"property":"article:modified_time","content":"2023-10-30T13:16:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"项目代码风格统一：eslint、prettier + VSCode\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-10-30T13:16:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Tandayuan\\",\\"url\\":\\"https://github.com/Tandayuan\\"}]}"]]},"headers":[{"level":2,"title":"操作版本","slug":"操作版本","link":"#操作版本","children":[]},{"level":2,"title":"npm依赖包","slug":"npm依赖包","link":"#npm依赖包","children":[]},{"level":2,"title":"VSCode插件","slug":"vscode插件","link":"#vscode插件","children":[]},{"level":2,"title":"VSCode配置文件（组合ESLint、Vetur插件保存后lint和fix代码）","slug":"vscode配置文件-组合eslint、vetur插件保存后lint和fix代码","link":"#vscode配置文件-组合eslint、vetur插件保存后lint和fix代码","children":[]},{"level":2,"title":"项目配置ESLint + Prettier","slug":"项目配置eslint-prettier","link":"#项目配置eslint-prettier","children":[{"level":3,"title":"忽略lint某个路径/文件配置：","slug":"忽略lint某个路径-文件配置","link":"#忽略lint某个路径-文件配置","children":[]}]},{"level":2,"title":"上传VSCode配置文件到Git","slug":"上传vscode配置文件到git","link":"#上传vscode配置文件到git","children":[]},{"level":2,"title":"使用方法","slug":"使用方法","link":"#使用方法","children":[]},{"level":2,"title":"husky+lintstaged规范化暂存区代码","slug":"husky-lintstaged规范化暂存区代码","link":"#husky-lintstaged规范化暂存区代码","children":[{"level":3,"title":"安装npm包","slug":"安装npm包","link":"#安装npm包","children":[]},{"level":3,"title":"测试husky的pre commit钩子执行npm test脚本","slug":"测试husky的pre-commit钩子执行npm-test脚本","link":"#测试husky的pre-commit钩子执行npm-test脚本","children":[]},{"level":3,"title":"编写lint-staged脚本，交给husky执行。","slug":"编写lint-staged脚本-交给husky执行。","link":"#编写lint-staged脚本-交给husky执行。","children":[]},{"level":3,"title":"测试husky的pre commit钩子执行npm run lint-staged脚本","slug":"测试husky的pre-commit钩子执行npm-run-lint-staged脚本","link":"#测试husky的pre-commit钩子执行npm-run-lint-staged脚本","children":[]}]}],"git":{"createdTime":1698671812000,"updatedTime":1698671812000,"contributors":[{"name":"谭达源","email":"tanleslie@foxmail.com","commits":1}]},"readingTime":{"minutes":3.45,"words":1034},"filePathRelative":"posts/study/vsCode-vuecli5-prettier-eslint-use/VSCode配置代码校验、格式化和修复.md","localizedDate":"2023年10月30日","excerpt":"<h1> 项目代码风格统一：eslint、prettier + VSCode</h1>\\n<h2> 操作版本</h2>\\n<blockquote>\\n<p>npm 7.21.1  node 16.9.1</p>\\n<p>\\"@babel/core\\": \\"^7.12.16\\"  \\"@babel/eslint-parser\\": \\"^7.12.16\\"  \\"eslint\\": \\"^7.32.0\\"  \\"eslint-config-prettier\\": \\"^8.3.0\\"</p>\\n<p>\\"eslint-plugin-prettier\\": \\"^4.0.0\\"  \\"eslint-plugin-vue\\": \\"^8.0.3\\"  \\"prettier\\": \\"^2.4.1\\"  \\"husky\\": \\"^8.0.3\\"</p>\\n<p>\\"lint-staged\\": \\"^13.1.2\\"</p>\\n</blockquote>","autoDesc":true}');export{e as data};
