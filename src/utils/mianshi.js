// async function async1(){
//   console.log("async1 start"); 
//   await async2();
//   console.log("async1 end");
// }
// setTimeout(()=> {
//   console.log("timeout");
// },0)
// setTimeout(()=>{console.log("timeout3")},3);
// async function async2(){
//   setTimeout(()=>{console.log("async2 timeout")}, 9);
// }
// console.log("start");
// async1();
// new Promise((resolve, reject)=>{
//   console.log("promise start");
//   resolve();
//   console.log("promise end");
// }).then(()=>{
//   console.log("promise then");
// })
// console.log("end");


const cherry = (fn) => {
  let len = fn.length;
  const result = [];
  const func = (...arr) => {
    result.push(...arr);
    if(result.length === len) {
      return fn(...result);
    }else if(result.length < len) {
      return func;
    }
  }
  return func;
}

const add = (x,y,z) => {
  return x+y+z;
}

// const cherryAdd = cherry(add);
// cherryAdd(1)(2)(3);

Function.prototype.mybind = (obj, ...arr) => {
  if(typeof this !== 'function') {
    throw new Error('not a function');
  }

  const self = this;

  var bound = (...rest) => {
    obj.fn = self;
    const result = obj.fn(...arr, ...rest);
    return result;
  }
  return bound;
}

Array.prototype.filter = function (callback){
  if(typeof callback !== 'function') throw new Error('只接收一个函数作为参数');  
  const arr = this;
    const newArr = [];

    for(let i = 0; i < arr.length; i++) {
      if(callback(arr[i], i, arr)) {
        newArr.push(arr[i]);
      }
    }
    return newArr;
}

Array.prototype.map = function (callback){
  if(typeof callback !== 'function') throw new Error('只接收一个函数作为参数');
  const arr = this;
  const newArr = [];
  for(let i = 0; i < arr.length; i++) {
    const result = callback(arr[i], i, arr);
    if(result) {
      newArr.push(result);
    }
  }
  return newArr;
}

function throttle (fn, time, immediate) {
  let timeout;
  return function () {
    if(!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        fn();
      }, time)
    }
  }
}

// 冒泡排序
const bubbleSort = (arr) => {
  const len = arr.length;
  if(len === 0 || len === 1) return arr;

  for(let i = 0; i < len; i++) {
    for(let j = i; j < len; j++) {
      if(arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  return arr;
}

// 01背包问题，构建表格，通过二维数组表示，求最值
export const backpack = (w, weightArr, valArr) => {
  if(w === 0) return 0;
  const result = [[]];
  const len = weightArr.length;
  // 第一行数据
  for(let i = 0; i <= w; i++) {
    const weight0 = weightArr[0];
    if(weight0 < i) {
      result[0][i] = valArr[0];
    }else {
      result[0][i] = 0;
    }
  }

  // 从第二行开始
  for(let i = 0; i <= w; i++) {
    for(let j = 1; j < len; j++) {
      if(!result[j]) result[j] = [];
      if(i < weightArr[j]) {
        result[j][i] = result[j - 1][i];
      }else {
        result[j][i] = Math.max(result[j - 1][i], result[j-1][i - weightArr[j]] + valArr[j])
      }
    }
  }
  console.log(result[len - 1][w]);
  return result[len - 1][w];
}

// 一道递归编程题
export const inputs = [
  {id: 'task1', deps: [], runTask: () => 1 },
  {id: 'task2', deps: ['task1', 'task3'], runTask: (res1, res2) => 5 + res1 + res2},
  {id: 'task3', deps: ['task1'], runTask: (res1) => 4 + res1},
  {id: 'task4', deps: ['task1', 'task2'], runTask: (res1, res2) => 5 + res1 + res2}
]
export function runAllTask (list, db) {
  try {
    const obj = {};
    const func = (recursionList) => {
      let result;
      recursionList.forEach(item => {
        const { id, deps, runTask } = item;
        if(deps.length === 0) {
          obj[id] = runTask();
          result = runTask();
        }else {
          const subList = list.filter(item => deps.includes(item.id));
          const args = subList.map(item => obj[item.id] ? obj[item.id] : func([item]));
          obj[id] = runTask(...args);
          result = runTask(...args);
        }
      });
      console.log(result);
      return result;
    }
    func(list);
    db(null, obj);
  } catch (error) {
    db(error, null);
  }
}
runAllTask(inputs, (err, res) => {
  console.log(res);
  // 输出{task1: 1, task2: 10, task3: 5, task4: 11}
})

// 背包问题的递归实现
export const RecursionBackpack = (w, weightArr, valArr) => {
  
}

// 迪杰斯特拉算法
export const dijkstra = (graph = [
  [0, 6, 0, 1, 0],
  [6, 0, 5, 2, 2],
  [0, 5, 0, 0, 5],
  [1, 2, 0, 0, 1],
  [0, 2, 5, 1, 0]
], src = 0) => {
  const length = graph.length;
  const nodes = [];
  for(let i = 0; i < length; i++) {
    const obj = {
      dist: Number.MAX_SAFE_INTEGER,
      visited: false
    }
    nodes[i] = obj;
  }
  nodes[src].dist = 0;

  for(let i = 0; i < length; i++) {
    // 获取未处理的节点中距离最近的一个节点
    let min = Number.MAX_SAFE_INTEGER;
    let minIndex = 0;
    nodes.forEach((item, index) => {
      if(!item.visited && item.dist < min) {
        min = item.dist;
        minIndex = index;
      }
    });

    for(let j = 0; j < length; j++) {
      if(nodes[j].visited === false && graph[minIndex][j] !== 0) {
        nodes[j].dist = Math.min(nodes[j].dist, graph[minIndex][j] + nodes[minIndex].dist)
      }
    }
    nodes[minIndex].visited = true;
  }
  // console.log(nodes);
  return nodes;
}

// 插入排序
export const insertSort = (arr = [2,1,4,7,5,3,6]) => {
  const length = arr.length;

  for(let i = 1; i < length; i++) {
    const temp = arr[i];
    let j = i;
    while(j > 0 && temp < arr[j - 1]) {
      arr[j] = arr[j-1];
      arr[j - 1] = null;
      j--; 
    }
    arr[j] = temp
  }
  console.log(arr);
  return arr;
}

// 归并排序
export const mergeSort = (arr = [23,34,5,32,45,21,22,4,6]) => {
  const length = arr.length;
  if(length < 2) return arr;
  const mid = Math.floor(length / 2);
  let left = arr.slice(0, mid);
  let right = arr.slice(mid, length);
  left = mergeSort(left);
  right = mergeSort(right);
  const result = [];
  let i = 0, j = 0;
  while(i < left.length && j < right.length) {
    if(left[i] < right[j]) {
      result.push(left[i]);
      i++;
    }else {
      result.push(right[j]);
      j++;
    }
  }
  if(i < left.length) result.push(...left.slice(i));
  if(j < right.length) result.push(...right.slice(j));
  return [...result];
}

// 使用promise隔一秒输出1，2，3
// const logSecond = (param) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(param);
//       resolve(param);
//     }, 1000)
//   })
// }

// const runLog = async () => {
//   for(let i = 0; i < 3; i++) {
//     await logSecond(i + 1);
//   }
// }

// runLog();
// end

// 快速排序
export const quickSort = (arr = [23,34,5,32000,4,45,21,22,4,6], left = 0, right = arr.length - 1) => {
  if(right - left < 2) return arr;
  const length = arr.length;
  let mid = Math.floor((left + right) / 2);
  const midVal = arr[mid];
  
  let i = 0, j = length - 1;
  while( i < j ) {
    while(arr[i] < midVal) {
      i++;
    }
    while(arr[j] > midVal) {
      j--;
    }
    // 交换
    if(i < j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    }
  }
  quickSort(arr, 0, i);
  quickSort(arr, i, right);
  return arr;
}

// 实现animation({el: 'id', duration: 1000, left: 300px}).then(() => {console.log('动画完成')});
function animation(options){
  const {id, duration, left} = options;

  const slip = duration / 16;
  const px = parseInt(left) * slip;
  const elem = document.getElementById(id);

  return new Promise((resolve) => {
    const timer = requestAnimationFrame(function fn() {
      const curLeft = parseInt(elem.style.left || 0);
      if(curLeft < left) {
        elem.style.left = curLeft + px + 'px';
        requestAnimationFrame(fn);
      }else {
        resolve();
        cancelAnimationFrame(timer);
      }
    })
  })
}

// 计数排序(属于分布式排序)
export const countSort = (arr = [23,34,5,32000,4,45,21,22,4,6]) => {
  console.time();
  if(arr.length === 1) return arr;

  const countArr = [];
  for(let i = 0 ; i < arr.length; i++) {
    if(!countArr[arr[i]]) {
      countArr[arr[i]] = 0;
    }
    countArr[arr[i]] += 1;
  }

  const result = [];
  for(let i = 0; i < countArr.length; i++) {
    const cur = countArr[i];
    if(cur && cur > 0) {
      for(let j = cur; j > 0; j--) {
        result.push(i);
      }
    }
  }
  console.timeEnd();
  return result;
}

class LazyClass {
  constructor(num){
    this.result = num;
    this.callback = null;
  }

  add(num){
    this.result += num;
    return this;
  }

  top(fn){
    this.callback = () => fn(this.result);
    return this;
  }

  async delay(timeout) {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        this.callback();
        resolve(this.result);
      }, timeout)
    })
    return this;
  }

  multipy(num) {
    this.result *= num;
    return this;
  }

  output(){
    console.log(this.result);
  }
}

function lazy(num) {
  return new LazyClass(num);
}

// const lazyFun = lazy(2).add(2).top(console.log).delay(1000).multipy(3); 
// // 此时不会输出任何东西

// setTimeout(() => {
//     lazyFun.output();
// }, 1000);
// console.log('start');


// 输出内容
// 'start'
// 等待1000ms
// 4
// 4
// 等待1000ms
// 12

const co = (fn) => {
  return new Promise((resolve, reject) => {
    const genFunc = fn();
    const step = (nextFn) => {
      let next
      try {
        next = nextFn();
      } catch (error) {
        return reject(error);
      }
      if(next.done) {
        resolve(next.value);
      }

      return Promise.resolve(next.value).then((res) => {
        return step(function (){return genFunc.next(res)})
      }, (err) => {
        return step(function () {return genFunc.throw(err)})
      })
    }
    step(function(){return genFunc(undefined)});
  })
}

// 异步编程  确定并发数量并发执行多个请求
class Supervene {
  constructor(){
    this.queue = [];
    this.readyQueue = [];
  }

  add(fn){
    return new Promise((resolve) => {
      // 判断运行队列是否有位置
      if(this.queue.length < 2) {
        // 直接将任务插入队列并且运行
        const index = this.queue.length;
        this.queue.push(index);
        fn().then(() => {
          // 如果等待队列中有任务
          if(this.readyQueue.length > 0) {
            // 出队列
            const func = this.readyQueue.shift();
            // 执行相应的任务
            func();
          }
          resolve()
        });
      }else {
        // 将任务推入到等待队列中
        this.readyQueue.push(() => {
          return fn().then(() => {
            // 如果等待队列中有任务
            if(this.readyQueue.length > 0) {
              // 出队列
              const func = this.readyQueue.shift();
              // 执行相应的任务
              func();
            }
            resolve();
          })
        })
      }
    })
  }
}
function timeout(time) {
  return new Promise(resolve => {
      setTimeout(() => {
          resolve();
      }, time);
  });
}
const supervene = new Supervene();
function addTask(time, name) {
  supervene.add(() => timeout(time)).then((res) => {
      console.log(`任务${name}完成${res}`);
  });
}
// addTask(10000, 1); // 10000ms后输出 任务1完成
// addTask(5000, 2); // 5000ms后输出 任务2完成
// addTask(3000, 3); // 8000ms后输出 任务3完成
// addTask(4000, 4); // 12000ms后输出 任务4完成
// addTask(5000, 5); // 15000ms后输出 任务5完成@骁

// 两个请求，按照优先有序顺序打印
// exp: req1: 10ms req2: 5ms; 10ms后打印出req1， req2；
// exp: req1: 5ms req2: 10ms; 5ms后打印出req1. 再过5ms后打印出req2
const req1 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("req1");
    }, 10000)
  })
}
const req2 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("req2");
    }, 5000)
  })
}

const orderlyLog = (firstReq, secondReq) => {
  let result = new Array(2).fill(0);
  firstReq.then((res) => {
    result[0] = res;
    const content = `${res}, ${result[1] ? result[1]: ''}`;
    console.log(content);
  });
  secondReq.then((res) => {
    result[1] = res;
    if(result[0]) {
      console.log(result[1]);
    }
  });
}

// orderlyLog(req2(), req1());

// 描述：实现一个函数，接受参数 urls，类型为字符串数组，函数逻辑为串行请求所有url，然后将结果作为一个数组返回。
// 要求：不可使用await。

function sendRequest(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(url);
    }, 2000);
  })
}

function serialRequest(urls) {
  const len = urls.length;
  if(len === 0) return;
  const result = [];
  let promise = Promise.resolve().then(() => sendRequest(urls[0]));
  return new Promise(resolve => {
    for(let i = 1; i <= len; i++) {
      promise = promise.then((res) => {
        result.push(res);
        if(result.length === len) {
          resolve(result);
        }
        return sendRequest(urls[i]);
      });
    };
  });
}

serialRequest(['url1', 'url2', 'url3', 'url4']).then((res) => {console.log(res)});

// const obj = { 
//   a: { 
//       b: 'hello ',
//       c: { 
//           d: 'world'
//           }
//         }, 
//   e: 'hello world'
// } 
// // 转换为 
// { 
//   'a.b': 'hello',
//   'a.c.d': 'hello world',
//   'e': 'hello wolrd'
// }

const transformObj = (obj) => {
  const newObj = {};
  function loop(obj, parentKey = "") {
    for(let [key, val] of Object.entries(obj)) {
      let currentKey = parentKey ? `${parentKey}.${key}` : key;
      if(typeof val === 'object') {
        loop(val, currentKey);
      }else {
        newObj[currentKey] = val;
      }
    }
  }

  loop(obj);
  return newObj;
}

// 千位分隔符
const numSplit = (num) => {
  return String(num).replaceAll(/(\d{3})/g, '$1.')
  // const arr = [];
  // let xiaoshu = String(num).split('.')[1] || '';
  // while(num > 999) {
  //   num = num / 1000;
  //   arr.unshift((String(num).split('.')[1] || '').padEnd(3, "0"));
  //   num = Math.floor(num);
  // }
  // return num + ',' + arr.join(',') + (xiaoshu ? '.' + xiaoshu : '');
}
