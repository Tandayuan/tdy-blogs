---
title: 理解p-limit实现原理
date: 2023-03-24
---
## 参考仓库

+ 地址：https://github.com/sindresorhus/p-limit

## 学习目标

+ [x] 学习并发、并行概念
+ [x] 分析代码每个部分原理
+ [x] 调试代码，加深理解
+ [x] 照葫芦画瓢仿写一个
+ [x] Jest配置支持引用node_modules包自动转换ES5，防止报错。

## 并发、并行概念

> 并发： 一个时间段内存在多个异步任务，通过算法调度交替执行完成他们，看起来像是一个时间内同时执行的多个任务数就叫并发。
>
> 权威解释：
>
> 并发当有多个线程在操作时,如果系统只有一个CPU,则它根本不可能真正同时进行一个以上的线程，它只能把CPU运行时间划分成若干个时间段,再将时间 段分配给各个线程执行，在一个时间段的线程代码运行时，其它线程处于挂起状。.这种方式我们称之为并发(Concurrent)。
>
> 并行：同一时间段内同时执行多个任务
>
> 权威解释：
>
>  **“并行”**指两个或两个以上事件或活动在同一时刻发生。在多道程序环境下，并行性使多个程序同一时刻可在不同CPU上**同时**执行。

**并行**是指两个或者多个事件在同一时刻发生；

而**并发是指两个或多个事件在同一时间间隔内发生。**

## 代码原理解读

> 基本实现原理：需要并发的函数传入plimit后被一个待决议Promise对象包裹，每传入一个并发函数给plimit，plimit的共享队列就多一个run函数的队列元素。所有需要并发的函数都以run函数的形式传入到队列后在下一个微任务阶段后开始实现并发，首先根据并发量执行并发。并发功能是在run函数内体现的，队列元素以先进先出的形式被推出，执行run函数实现一个并发。包裹的Promise完成决议返回结果，确定Promise决议后再判断队列是否为空，不为空继续实现并发（推出队列元素），重复以上步骤完成并发。

+ 导入使用

  声明并发数量为2，limit函数的参数是个匿名函数，它会被plimt限制并发。

    ```js
    const limit = pLimit(2);
    limit(async () => {
        await delay(100); // 延迟100ms后执行
        return "tdy";
    });
    limit(async () => {
        await delay(200); // 延迟200ms后执行
        return "123";
    });
    limit(async () => {
        await delay(400); // 延迟400ms后执行
        return "888";
    });
    ```

+ generator

  上文的limit函数对应的就是generator函数，它会返回一个待决议的Promise对象包裹传入进来的参数（即上文的匿名函数），包裹的作用是推入队列。
  
  ```js
  const generator = (fn, ...args) => new Promise(resolve => {
      enqueue(fn, resolve, args);
  });
  ```
  
  > 拦截generator函数对象，添加activeCount（当前的并发数量）、pendingCount（队列中剩余的元素也就是未并发数量）、clearQueue（清空队列的方法，队列中的元素将不会被执行）
  
  ```javascript
  Object.defineProperties(generator, {
      activeCount: {
          get: () => activeCount,
      },
      pendingCount: {
          get: () => queue.size,
      },
      clearQueue: {
          value: () => {
              queue.clear();
          },
      },
  });
  ```

+ enqueue

  > concurrency  === 最大并发数量

  > 先在宏任务阶段执行推入队列操作（上文有3次limit()执行，所以执行推入队列3次），队列中的3个元素都推完后再执行微任务阶段的操作。
  >
  > ps：推入队列的是run的bind函数，推出队列 queue.dequeue()()实际执行的就是run函数
  >
  > 微任务阶段操作：由于同时执行了3次limit()，匿名的微任务函数执行3次。由于最大并发数量是2次，所以同时执行推出队列函数的数量是2个。因此此阶段所作的操作是依据最大并发数量同时推出对应数量的队列元素实现并发。 
  >
  > 总结：推入所有调用limit()个数量的元素组成队列，再首次执行最大并发数量的并发。

  ```js
  const enqueue = (fn, resolve, args) => {
      queue.enqueue(run.bind(undefined, fn, resolve, args));
      (async () => {
          // This function needs to wait until the next microtask before comparing
          // `activeCount` to `concurrency`, because `activeCount` is updated 					asynchronously
          // when the run function is dequeued and called. The comparison in the if-				statement
          // needs to happen asynchronously as well to get an up-to-date value for 				`activeCount`.
          await Promise.resolve();
  
          if (activeCount < concurrency && queue.size > 0) {
              queue.dequeue()();
          }
      })();
  };
  ```

+ run、next

  > 实现并发函数的执行靠的是run，执行完成后并发函数-1，需要维持最大并发数量靠的是next。
  >
  > run函数：更新当前并发数量activeCount，执行并发函数并决议generator的Promise（resolve(result)），await result是等待决议完成，说明当前并发函数已经执行完成。
  >
  > next函数：假设最大并发数量是2，run执行后并发函数已经执行完成，需要更新最大并发数量-1。队列不为空的情况下再依据先进先出的原则推出队列中一个元素维持最大并发数量。
  >
  > ps：当队列是空的时候说明所有需要并发的函数都已全部并发执行完成。

  ```javascript
  const next = () => {
      activeCount--;
  
      if (queue.size > 0) {
          queue.dequeue()();
      }
  };
  const run = async (fn, resolve, args) => {
      activeCount++;
  
      const result = (async () => fn(...args))();
  
      resolve(result);
  
      try {
          await result;
      } catch {}
  
      next();
  };
  ```

  

## 调试代码，加深理解

+ 调试源码的测试用例

  ```js
  test('concurrency: 1', async t => {
  	const input = [
  		[10, 300],
  		[20, 200],
  		[30, 100],
  	];
  
  	const end = timeSpan();
  	const limit = pLimit(2);
  
  	const mapper = ([value, ms]) => limit(async () => {
  		await delay(ms);
  		return value;
  	});
  
  	t.deepEqual(await Promise.all(input.map(x => mapper(x))), [10, 20, 30]);
  	t.true(inRange(end(), {start: 590, end: 650}));
  });
  ```

+ 调试方法：单步调试看效果

+ 检查enqueue推入队列前的数量是0

  ![image-20230317230716939](.\images\1679065573563.jpg)

+ 宏任务执行完成后微任务执行阶段：队列数量是3

  ![](.\images\1679065870742.jpg)

+ 执行推出队列函数，实现并发功能：

  + activeCount状态更新+1，最大并发数量是2

  ![](.\images\Snipaste_2023-03-17_23-10-05.png)

  + 并发的是第一个推入的函数：

  ![](.\images\Snipaste_2023-03-17_23-17-57.png)

  + 微任务阶段可以看到另一个并发函数也执行了

    ![](.\images\Snipaste_2023-03-17_23-19-31.png)

  + 执行完成以后当前并发数量-1

    ![](.\images\1679066678422.jpg)

  + 由于我们调试的第一个函数等待时间300ms>第二个同时并发的函数等待时间200ms。因此第二个函数的决议比第一个快，所以下一次并发进入next()执行next的推出队列操作的是第二个函数。我们调试的第一个看到的队列元素是0的原因就是如此。

    ![](.\images\Snipaste_2023-03-17_23-31-07.png)

  + 并发后程序的执行总时间在300ms~350ms之间，图解：

    ![](.\images\Snipaste_2023-03-17_23-34-30.png)

## Jest配置支持引用node_modules包自动转换ES5，防止报错。

> jest.config.js
>
> tips： 以下配置是针对pnpm环境，如果是npm环境手动更正transformIgnorePatterns的匹配路径

```js
{
    // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",
  // testMatch是glob模式的语法，它的作用是检测哪些目录下的哪些文件需要被测试
  testMatch: ["<rootDir>/tests/**/*.(spec|test).ts?(x)"],
  // transform是正则表达式的语法
  // testMatch匹配到的文件用transform指定的对应转换器处理。这里的js文件用babel-jest转换；ts、tsx文件用ts-jest转换。
  transform: {
      "^.+\\.js$": "babel-jest",
      "^.+\\.(ts|tsx)$": "ts-jest"
  },
  //  匹配到yocto-queue | delay | time-span | convert-hrtime 模块，transformIgnorePatterns的数组值为空，表示转换器transform对项目路径下的任何目录都会转换
  //  否则 transformIgnorePatterns的值是["<rootDir>/node_modules/.pnpm/"],表示转换器transform在转换es6过程中忽略掉数组中的目录，不转换es6。
  // transformIgnorePatterns 是正则表达式的语法
  transformIgnorePatterns: ["<rootDir>/node_modules/\.pnpm/(?!(yocto-queue|delay|time-span|convert-hrtime|random-int))"]
}
```

