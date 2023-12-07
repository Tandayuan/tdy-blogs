const t=JSON.parse('{"key":"v-52fc7a6c","path":"/posts/study/koa-compose-study/","title":"学习和分析Koa洋葱模型的实现","lang":"zh-CN","frontmatter":{"date":"2023-03-30T00:00:00.000Z","dir":{"link":true},"description":"学习和分析Koa洋葱模型的实现 仓库地址 https://github.com/Tandayuan/koa-simple-study 参考文章、仓库 参考文章1：若川-50行代码串行Promise，koa洋葱模型原来是这么实现？ 参考文章2：https://juejin.cn/post/7160681567348588580/#heading-6 模板仓库：https://github.com/lxchuan12/koa-compose-analysis","head":[["meta",{"property":"og:url","content":"https://tandayuan.github.io/tdy-blogs/tdy-blogs/posts/study/koa-compose-study/"}],["meta",{"property":"og:site_name","content":"TDYBlogs"}],["meta",{"property":"og:title","content":"学习和分析Koa洋葱模型的实现"}],["meta",{"property":"og:description","content":"学习和分析Koa洋葱模型的实现 仓库地址 https://github.com/Tandayuan/koa-simple-study 参考文章、仓库 参考文章1：若川-50行代码串行Promise，koa洋葱模型原来是这么实现？ 参考文章2：https://juejin.cn/post/7160681567348588580/#heading-6 模板仓库：https://github.com/lxchuan12/koa-compose-analysis"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://tandayuan.github.io/tdy-blogs/tdy-blogs/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-30T13:57:12.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"学习和分析Koa洋葱模型的实现"}],["meta",{"property":"article:author","content":"Tandayuan"}],["meta",{"property":"article:published_time","content":"2023-03-30T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-30T13:57:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"学习和分析Koa洋葱模型的实现\\",\\"image\\":[\\"https://tandayuan.github.io/tdy-blogs/tdy-blogs/\\"],\\"datePublished\\":\\"2023-03-30T00:00:00.000Z\\",\\"dateModified\\":\\"2023-10-30T13:57:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Tandayuan\\",\\"url\\":\\"https://github.com/Tandayuan\\"}]}"]]},"headers":[{"level":2,"title":"仓库地址","slug":"仓库地址","link":"#仓库地址","children":[]},{"level":2,"title":"参考文章、仓库","slug":"参考文章、仓库","link":"#参考文章、仓库","children":[]},{"level":2,"title":"学习目标","slug":"学习目标","link":"#学习目标","children":[]},{"level":2,"title":"学习克隆和保留 compose 仓库的 git 记录","slug":"学习克隆和保留-compose-仓库的-git-记录","link":"#学习克隆和保留-compose-仓库的-git-记录","children":[]},{"level":2,"title":"调试和分析koa-compose代码","slug":"调试和分析koa-compose代码","link":"#调试和分析koa-compose代码","children":[{"level":3,"title":"调试should work测试用例","slug":"调试should-work测试用例","link":"#调试should-work测试用例","children":[]},{"level":3,"title":"调试should throw if next() is called multiple times测试用例","slug":"调试should-throw-if-next-is-called-multiple-times测试用例","link":"#调试should-throw-if-next-is-called-multiple-times测试用例","children":[]},{"level":3,"title":"调试should catch downstream errors测试用例","slug":"调试should-catch-downstream-errors测试用例","link":"#调试should-catch-downstream-errors测试用例","children":[]}]},{"level":2,"title":"学习高阶函数概念","slug":"学习高阶函数概念","link":"#学习高阶函数概念","children":[]},{"level":2,"title":"比较node的promisify模式与koa洋葱模型的相似点","slug":"比较node的promisify模式与koa洋葱模型的相似点","link":"#比较node的promisify模式与koa洋葱模型的相似点","children":[]}],"git":{"createdTime":1698659477000,"updatedTime":1698674232000,"contributors":[{"name":"谭达源","email":"tanleslie@foxmail.com","commits":3}]},"readingTime":{"minutes":3.56,"words":1068},"filePathRelative":"posts/study/koa-compose-study/README.md","localizedDate":"2023年3月30日","excerpt":"<h1> 学习和分析Koa洋葱模型的实现</h1>\\n<h2> 仓库地址</h2>\\n<p><a href=\\"https://github.com/Tandayuan/koa-simple-study\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://github.com/Tandayuan/koa-simple-study</a></p>\\n<h2> 参考文章、仓库</h2>\\n<blockquote>\\n<ul>\\n<li>参考文章1：<a href=\\"https://juejin.cn/post/7005375860509245471#heading-11\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">若川-50行代码串行Promise，koa洋葱模型原来是这么实现？</a></li>\\n<li>参考文章2：<a href=\\"https://juejin.cn/post/7160681567348588580/#heading-6\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://juejin.cn/post/7160681567348588580/#heading-6</a></li>\\n<li>模板仓库：<a href=\\"https://github.com/lxchuan12/koa-compose-analysis\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://github.com/lxchuan12/koa-compose-analysis</a></li>\\n</ul>\\n</blockquote>","autoDesc":true}');export{t as data};