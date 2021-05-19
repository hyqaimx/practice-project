export const deepClone = function (obj){
  let objClone;
  if(obj instanceof Array) {
    objClone = [];
    for(let i = 0; i < obj.length; i++) {
      objClone[i] = deepClone(obj[i]);
    }
  }else if(obj instanceof Function) {
    return function () {
      const context = this;
      return obj.apply(context)
    }
  } else if(obj instanceof Object) {
    objClone = {};
    for(let [key, value] of Object.entries(obj)) {
      objClone[key] = deepClone(value);
    }
  }else {
    objClone = obj;
  }
  
  return objClone;
}

/**
 * @author 马骁
 * @description 将有序数组转换为高度差小于1的树
 */

 function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
 }

export const sortedArrayToBST = (nums) => {
  if(nums.length === 0) return null;
  const mid = Math.floor(nums.length / 2);
  const leftArr = nums.slice(0, mid);
  const rightArr = nums.slice(mid + 1, nums.length);
  const root = new TreeNode(nums[mid]);
  root.left = sortedArrayToBST(leftArr);
  root.right = sortedArrayToBST(rightArr);
  return root;
}

/**
 * @author 马骁
 * @description 判断平衡二叉树
 */

const deep = (root) => {
  if(!root) return 0;
  return Math.max(deep(root.left), deep(root.right)) + 1;
}

export const isBalanced = (root) => {
  if(!root) return true;
  return isBalanced(root.left) && isBalanced(root.right) && Math.abs(deep(root.left) - deep(root.right)) <= 1;
}

/**
 * @author 马骁
 * @description 二叉树的最小深度
 */

export const minDepth = (root) => {
  if(!root) return 0;
  if(!root.left) return minDepth(root.right);
  if(!root.right) return minDepth(root.left);
  const leftDep = minDepth(root.left) + 1;
  const rightDep = minDepth(root.right) + 1;
  return Math.min(leftDep, rightDep);
}

/**
 * @author 马骁
 * @description 二叉树判断一条路径总和是否等于某值
 */

export const hasPathSum = (root, targetSum) => {
  if(!root) return false;
  const minus = targetSum - root.val;
  const left = root.left;
  const right = root.right;
  if(minus === 0 && !left && !right) return true;
  return hasPathSum(left, minus) || hasPathSum(right, minus);
}

/**
 * @author 马骁
 * @description 构建栈
 */
export function Stack() {
  const listSymbol = Symbol('list');
  const countSymbol = Symbol('count');
  class Stack{
    constructor(){
      this[listSymbol] = {};
      this[countSymbol] = 0;
    }
  
    isEmpty() {
      return this[countSymbol] === 0;
    }
  
    push(item) {
      this[listSymbol][this[countSymbol]] = item;
      this[countSymbol] ++;
    }
  
    pop(){
      const item = this[listSymbol][this[countSymbol] - 1];
      delete this[listSymbol][this[countSymbol] - 1];
      this[countSymbol] -- ;
      return item;
    }
  
    size() {
      return this[countSymbol];
    }
  }
  return new Stack();
}

/**
 * @author 马骁
 * @description 给定层数构建杨辉三角
 * @date 2021-05-08
 */

export const generate = (numRows) => {
  const arrTotal = [];
  for(let i = 0; i < numRows; i++) {
    if (i === 0) {
      arrTotal.push([1]);
    }else {
      const prevRow = arrTotal[i-1];
      const childArr = Array.from({length: i + 1}).map((item, index) => {
        const left = prevRow[index - 1] || 0;
        const right = prevRow[index] || 0;
        const val = left + right;
        return val;
      })
      arrTotal.push(childArr);
    }
  }
  return arrTotal;
}

/**
 * @author maxiao
 * @description 获取杨辉三角指定层数数据
 * @date 2021-05-10
 */

export const getRow = (rowIndex) => {
  const arr = [1];
  for(let i = 1; i <= rowIndex; i++) {
    const arrCopy = [...arr];
    for(let j = 0; j <= i; j++) {
      arr[j] = (arrCopy[j - 1] || 0) + (arrCopy[j] || 0);
    }
  }
  return arr;
}

/**
 * @author 马骁
 * @description 获取数组正序的最大差值
 * @date 2021-05-12
 */

export const maxValue = (prices) => {
  if(prices.length === 0) return 0;
  let min = prices[0];
  let res = 0;
  for(let i = 1; i < prices.length; i++) {
    min = Math.min(min, prices[i]);
    console.log(min);
    res = Math.max(prices[i] - min, res);
  }
  return res;
}

/**
 * @author 马骁
 * @description 股票投资的最大利润
 * @date 2021-05-19
 */

export const maxValue1 = (prices) => {
  if(prices.length === 0) return 0;
  let res = 0;
  let min = prices[0];
  for(let i = 1; i < prices.length; i++) {
    const add = prices[i] - prices[i-1];
    if(add < 0) {
      min = prices[i];
    }else {
      res = res + add;
    }
  }
  return res;
}
