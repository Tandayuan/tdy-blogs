import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as e,c as o,a as n,b as s,d as c,f as i}from"./app-db139f56.js";const l="/tdy-blogs/assets/1679065573563-3951fd8a.jpg",u="/tdy-blogs/assets/1679065870742-8655518d.jpg",r="/tdy-blogs/assets/Snipaste_2023-03-17_23-10-05-6cea264c.png",k="/tdy-blogs/assets/Snipaste_2023-03-17_23-17-57-2e6caed0.png",d="/tdy-blogs/assets/Snipaste_2023-03-17_23-19-31-77ff61c2.png",m="/tdy-blogs/assets/1679066678422-87fc2b0a.jpg",v="/tdy-blogs/assets/Snipaste_2023-03-17_23-31-07-8333753e.png",b="/tdy-blogs/assets/Snipaste_2023-03-17_23-34-30-46d27c0b.png",g={},f=n("h2",{id:"参考仓库",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#参考仓库","aria-hidden":"true"},"#"),s(" 参考仓库")],-1),y={href:"https://github.com/sindresorhus/p-limit",target:"_blank",rel:"noopener noreferrer"},h=i(`<h2 id="学习目标" tabindex="-1"><a class="header-anchor" href="#学习目标" aria-hidden="true">#</a> 学习目标</h2><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-0" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-0"> 学习并发、并行概念</label></li><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-1" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-1"> 分析代码每个部分原理</label></li><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-2" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-2"> 调试代码，加深理解</label></li><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-3" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-3"> 照葫芦画瓢仿写一个</label></li><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-4" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-4"> Jest配置支持引用node_modules包自动转换ES5，防止报错。</label></li></ul><h2 id="并发、并行概念" tabindex="-1"><a class="header-anchor" href="#并发、并行概念" aria-hidden="true">#</a> 并发、并行概念</h2><blockquote><p>并发： 一个时间段内存在多个异步任务，通过算法调度交替执行完成他们，看起来像是一个时间内同时执行的多个任务数就叫并发。</p><p>权威解释：</p><p>并发当有多个线程在操作时,如果系统只有一个CPU,则它根本不可能真正同时进行一个以上的线程，它只能把CPU运行时间划分成若干个时间段,再将时间 段分配给各个线程执行，在一个时间段的线程代码运行时，其它线程处于挂起状。.这种方式我们称之为并发(Concurrent)。</p><p>并行：同一时间段内同时执行多个任务</p><p>权威解释：</p><p><strong>“并行”<strong>指两个或两个以上事件或活动在同一时刻发生。在多道程序环境下，并行性使多个程序同一时刻可在不同CPU上</strong>同时</strong>执行。</p></blockquote><p><strong>并行</strong>是指两个或者多个事件在同一时刻发生；</p><p>而<strong>并发是指两个或多个事件在同一时间间隔内发生。</strong></p><h2 id="代码原理解读" tabindex="-1"><a class="header-anchor" href="#代码原理解读" aria-hidden="true">#</a> 代码原理解读</h2><blockquote><p>基本实现原理：需要并发的函数传入plimit后被一个待决议Promise对象包裹，每传入一个并发函数给plimit，plimit的共享队列就多一个run函数的队列元素。所有需要并发的函数都以run函数的形式传入到队列后在下一个微任务阶段后开始实现并发，首先根据并发量执行并发。并发功能是在run函数内体现的，队列元素以先进先出的形式被推出，执行run函数实现一个并发。包裹的Promise完成决议返回结果，确定Promise决议后再判断队列是否为空，不为空继续实现并发（推出队列元素），重复以上步骤完成并发。</p></blockquote><ul><li><p>导入使用</p><p>声明并发数量为2，limit函数的参数是个匿名函数，它会被plimt限制并发。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> limit <span class="token operator">=</span> <span class="token function">pLimit</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">limit</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> <span class="token function">delay</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 延迟100ms后执行</span>
    <span class="token keyword">return</span> <span class="token string">&quot;tdy&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">limit</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> <span class="token function">delay</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 延迟200ms后执行</span>
    <span class="token keyword">return</span> <span class="token string">&quot;123&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">limit</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> <span class="token function">delay</span><span class="token punctuation">(</span><span class="token number">400</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 延迟400ms后执行</span>
    <span class="token keyword">return</span> <span class="token string">&quot;888&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>generator</p><p>上文的limit函数对应的就是generator函数，它会返回一个待决议的Promise对象包裹传入进来的参数（即上文的匿名函数），包裹的作用是推入队列。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">generator</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> <span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token parameter">resolve</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">enqueue</span><span class="token punctuation">(</span>fn<span class="token punctuation">,</span> resolve<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>拦截generator函数对象，添加activeCount（当前的并发数量）、pendingCount（队列中剩余的元素也就是未并发数量）、clearQueue（清空队列的方法，队列中的元素将不会被执行）</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>Object<span class="token punctuation">.</span><span class="token function">defineProperties</span><span class="token punctuation">(</span>generator<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">activeCount</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> activeCount<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">pendingCount</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> queue<span class="token punctuation">.</span>size<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">clearQueue</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">value</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            queue<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>enqueue</p><blockquote><p>concurrency === 最大并发数量</p></blockquote><blockquote><p>先在宏任务阶段执行推入队列操作（上文有3次limit()执行，所以执行推入队列3次），队列中的3个元素都推完后再执行微任务阶段的操作。</p><p>ps：推入队列的是run的bind函数，推出队列 queue.dequeue()()实际执行的就是run函数</p><p>微任务阶段操作：由于同时执行了3次limit()，匿名的微任务函数执行3次。由于最大并发数量是2次，所以同时执行推出队列函数的数量是2个。因此此阶段所作的操作是依据最大并发数量同时推出对应数量的队列元素实现并发。</p><p>总结：推入所有调用limit()个数量的元素组成队列，再首次执行最大并发数量的并发。</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">enqueue</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> resolve<span class="token punctuation">,</span> args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    queue<span class="token punctuation">.</span><span class="token function">enqueue</span><span class="token punctuation">(</span><span class="token function">run</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">,</span> fn<span class="token punctuation">,</span> resolve<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// This function needs to wait until the next microtask before comparing</span>
        <span class="token comment">// \`activeCount\` to \`concurrency\`, because \`activeCount\` is updated 					asynchronously</span>
        <span class="token comment">// when the run function is dequeued and called. The comparison in the if-				statement</span>
        <span class="token comment">// needs to happen asynchronously as well to get an up-to-date value for 				\`activeCount\`.</span>
        <span class="token keyword">await</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>activeCount <span class="token operator">&lt;</span> concurrency <span class="token operator">&amp;&amp;</span> queue<span class="token punctuation">.</span>size <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            queue<span class="token punctuation">.</span><span class="token function">dequeue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>run、next</p><blockquote><p>实现并发函数的执行靠的是run，执行完成后并发函数-1，需要维持最大并发数量靠的是next。</p><p>run函数：更新当前并发数量activeCount，执行并发函数并决议generator的Promise（resolve(result)），await result是等待决议完成，说明当前并发函数已经执行完成。</p><p>next函数：假设最大并发数量是2，run执行后并发函数已经执行完成，需要更新最大并发数量-1。队列不为空的情况下再依据先进先出的原则推出队列中一个元素维持最大并发数量。</p><p>ps：当队列是空的时候说明所有需要并发的函数都已全部并发执行完成。</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">next</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    activeCount<span class="token operator">--</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>queue<span class="token punctuation">.</span>size <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        queue<span class="token punctuation">.</span><span class="token function">dequeue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">run</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> resolve<span class="token punctuation">,</span> args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    activeCount<span class="token operator">++</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">resolve</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">await</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="调试代码-加深理解" tabindex="-1"><a class="header-anchor" href="#调试代码-加深理解" aria-hidden="true">#</a> 调试代码，加深理解</h2><ul><li><p>调试源码的测试用例</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;concurrency: 1&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token parameter">t</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
	<span class="token keyword">const</span> input <span class="token operator">=</span> <span class="token punctuation">[</span>
		<span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">300</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
		<span class="token punctuation">[</span><span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
		<span class="token punctuation">[</span><span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
	<span class="token punctuation">]</span><span class="token punctuation">;</span>

	<span class="token keyword">const</span> end <span class="token operator">=</span> <span class="token function">timeSpan</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">const</span> limit <span class="token operator">=</span> <span class="token function">pLimit</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token keyword">const</span> <span class="token function-variable function">mapper</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">[</span>value<span class="token punctuation">,</span> ms<span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">limit</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
		<span class="token keyword">await</span> <span class="token function">delay</span><span class="token punctuation">(</span>ms<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> value<span class="token punctuation">;</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	t<span class="token punctuation">.</span><span class="token function">deepEqual</span><span class="token punctuation">(</span><span class="token keyword">await</span> Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span>input<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">x</span> <span class="token operator">=&gt;</span> <span class="token function">mapper</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	t<span class="token punctuation">.</span><span class="token boolean">true</span><span class="token punctuation">(</span><span class="token function">inRange</span><span class="token punctuation">(</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">start</span><span class="token operator">:</span> <span class="token number">590</span><span class="token punctuation">,</span> <span class="token literal-property property">end</span><span class="token operator">:</span> <span class="token number">650</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>调试方法：单步调试看效果</p></li><li><p>检查enqueue推入队列前的数量是0</p><figure><img src="`+l+'" alt="image-20230317230716939" tabindex="0" loading="lazy"><figcaption>image-20230317230716939</figcaption></figure></li><li><p>宏任务执行完成后微任务执行阶段：队列数量是3</p><figure><img src="'+u+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure></li><li><p>执行推出队列函数，实现并发功能：</p><ul><li>activeCount状态更新+1，最大并发数量是2</li></ul><figure><img src="'+r+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>并发的是第一个推入的函数：</li></ul><figure><img src="'+k+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li><p>微任务阶段可以看到另一个并发函数也执行了</p><figure><img src="'+d+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure></li><li><p>执行完成以后当前并发数量-1</p><figure><img src="'+m+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure></li><li><p>由于我们调试的第一个函数等待时间300ms&gt;第二个同时并发的函数等待时间200ms。因此第二个函数的决议比第一个快，所以下一次并发进入next()执行next的推出队列操作的是第二个函数。我们调试的第一个看到的队列元素是0的原因就是如此。</p><figure><img src="'+v+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure></li><li><p>并发后程序的执行总时间在300ms~350ms之间，图解：</p><figure><img src="'+b+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure></li></ul></li></ul><h2 id="jest配置支持引用node-modules包自动转换es5-防止报错。" tabindex="-1"><a class="header-anchor" href="#jest配置支持引用node-modules包自动转换es5-防止报错。" aria-hidden="true">#</a> Jest配置支持引用node_modules包自动转换ES5，防止报错。</h2><blockquote><p>jest.config.js</p><p>tips： 以下配置是针对pnpm环境，如果是npm环境手动更正transformIgnorePatterns的匹配路径</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
    <span class="token comment">// A preset that is used as a base for Jest&#39;s configuration</span>
  <span class="token literal-property property">preset</span><span class="token operator">:</span> <span class="token string">&quot;ts-jest&quot;</span><span class="token punctuation">,</span>
  <span class="token comment">// testMatch是glob模式的语法，它的作用是检测哪些目录下的哪些文件需要被测试</span>
  <span class="token literal-property property">testMatch</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&lt;rootDir&gt;/tests/**/*.(spec|test).ts?(x)&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token comment">// transform是正则表达式的语法</span>
  <span class="token comment">// testMatch匹配到的文件用transform指定的对应转换器处理。这里的js文件用babel-jest转换；ts、tsx文件用ts-jest转换。</span>
  <span class="token literal-property property">transform</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&quot;^.+\\\\.js$&quot;</span><span class="token operator">:</span> <span class="token string">&quot;babel-jest&quot;</span><span class="token punctuation">,</span>
      <span class="token string-property property">&quot;^.+\\\\.(ts|tsx)$&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ts-jest&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">//  匹配到yocto-queue | delay | time-span | convert-hrtime 模块，transformIgnorePatterns的数组值为空，表示转换器transform对项目路径下的任何目录都会转换</span>
  <span class="token comment">//  否则 transformIgnorePatterns的值是[&quot;&lt;rootDir&gt;/node_modules/.pnpm/&quot;],表示转换器transform在转换es6过程中忽略掉数组中的目录，不转换es6。</span>
  <span class="token comment">// transformIgnorePatterns 是正则表达式的语法</span>
  <span class="token literal-property property">transformIgnorePatterns</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&lt;rootDir&gt;/node_modules/\\.pnpm/(?!(yocto-queue|delay|time-span|convert-hrtime|random-int))&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14);function q(x,_){const a=p("ExternalLinkIcon");return e(),o("div",null,[f,n("ul",null,[n("li",null,[s("地址："),n("a",y,[s("https://github.com/sindresorhus/p-limit"),c(a)])])]),h])}const C=t(g,[["render",q],["__file","index.html.vue"]]);export{C as default};
