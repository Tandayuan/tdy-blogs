const e=JSON.parse('{"key":"v-0c5a9b90","path":"/posts/study/p-limit-study/","title":"理解p-limit实现原理","lang":"zh-CN","frontmatter":{"title":"理解p-limit实现原理","date":"2023-03-24T00:00:00.000Z","description":"参考仓库 地址：https://github.com/sindresorhus/p-limit 学习目标 学习并发、并行概念 分析代码每个部分原理 调试代码，加深理解 照葫芦画瓢仿写一个 Jest配置支持引用node_modules包自动转换ES5，防止报错。","head":[["meta",{"property":"og:url","content":"https://tandayuan.github.io/tdy-blogs/tdy-blogs/posts/study/p-limit-study/"}],["meta",{"property":"og:site_name","content":"TDYBlogs"}],["meta",{"property":"og:title","content":"理解p-limit实现原理"}],["meta",{"property":"og:description","content":"参考仓库 地址：https://github.com/sindresorhus/p-limit 学习目标 学习并发、并行概念 分析代码每个部分原理 调试代码，加深理解 照葫芦画瓢仿写一个 Jest配置支持引用node_modules包自动转换ES5，防止报错。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-28T14:39:04.000Z"}],["meta",{"property":"article:author","content":"Tandayuan"}],["meta",{"property":"article:published_time","content":"2023-03-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-28T14:39:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"理解p-limit实现原理\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-03-24T00:00:00.000Z\\",\\"dateModified\\":\\"2023-10-28T14:39:04.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Tandayuan\\",\\"url\\":\\"https://github.com/Tandayuan\\"}]}"]]},"headers":[{"level":2,"title":"参考仓库","slug":"参考仓库","link":"#参考仓库","children":[]},{"level":2,"title":"学习目标","slug":"学习目标","link":"#学习目标","children":[]},{"level":2,"title":"并发、并行概念","slug":"并发、并行概念","link":"#并发、并行概念","children":[]},{"level":2,"title":"代码原理解读","slug":"代码原理解读","link":"#代码原理解读","children":[]},{"level":2,"title":"调试代码，加深理解","slug":"调试代码-加深理解","link":"#调试代码-加深理解","children":[]},{"level":2,"title":"Jest配置支持引用node_modules包自动转换ES5，防止报错。","slug":"jest配置支持引用node-modules包自动转换es5-防止报错。","link":"#jest配置支持引用node-modules包自动转换es5-防止报错。","children":[]}],"git":{"createdTime":1698503944000,"updatedTime":1698503944000,"contributors":[{"name":"谭达源","email":"tanleslie@foxmail.com","commits":1}]},"readingTime":{"minutes":6.36,"words":1908},"filePathRelative":"posts/study/p-limit-study/README.md","localizedDate":"2023年3月24日","excerpt":"<h2> 参考仓库</h2>\\n<ul>\\n<li>地址：<a href=\\"https://github.com/sindresorhus/p-limit\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://github.com/sindresorhus/p-limit</a></li>\\n</ul>\\n<h2> 学习目标</h2>\\n<ul class=\\"task-list-container\\">\\n<li class=\\"task-list-item\\"><input type=\\"checkbox\\" class=\\"task-list-item-checkbox\\" id=\\"task-item-0\\" checked=\\"checked\\" disabled=\\"disabled\\"><label class=\\"task-list-item-label\\" for=\\"task-item-0\\"> 学习并发、并行概念</label></li>\\n<li class=\\"task-list-item\\"><input type=\\"checkbox\\" class=\\"task-list-item-checkbox\\" id=\\"task-item-1\\" checked=\\"checked\\" disabled=\\"disabled\\"><label class=\\"task-list-item-label\\" for=\\"task-item-1\\"> 分析代码每个部分原理</label></li>\\n<li class=\\"task-list-item\\"><input type=\\"checkbox\\" class=\\"task-list-item-checkbox\\" id=\\"task-item-2\\" checked=\\"checked\\" disabled=\\"disabled\\"><label class=\\"task-list-item-label\\" for=\\"task-item-2\\"> 调试代码，加深理解</label></li>\\n<li class=\\"task-list-item\\"><input type=\\"checkbox\\" class=\\"task-list-item-checkbox\\" id=\\"task-item-3\\" checked=\\"checked\\" disabled=\\"disabled\\"><label class=\\"task-list-item-label\\" for=\\"task-item-3\\"> 照葫芦画瓢仿写一个</label></li>\\n<li class=\\"task-list-item\\"><input type=\\"checkbox\\" class=\\"task-list-item-checkbox\\" id=\\"task-item-4\\" checked=\\"checked\\" disabled=\\"disabled\\"><label class=\\"task-list-item-label\\" for=\\"task-item-4\\"> Jest配置支持引用node_modules包自动转换ES5，防止报错。</label></li>\\n</ul>","autoDesc":true}');export{e as data};
