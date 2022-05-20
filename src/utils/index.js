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

/**
 * @author 马骁
 * @description 验证回文字符串
 * @date 2021-05-20
 */

export const isPalindrome = (s) => {
  if(!s || s.length === 0) return true;
  let str = s.toLowerCase().split(' ').join('').replace(/[^0-9a-zA-Z]/ig, '');
  let len = str.length - 1;
  let i = 0;
  let flag = true;
  while(i < len) {
    if(str[i] !== str[len]) {
      flag = false;
      break;
    }
    i++;
    len--;
  }
  return flag;
}

/**
 * @author 马骁
 * @description 找出只出现了一次的字符
 * @date 2021-05-25
 */

export const singleNumber = (nums) => {
  // for(let i = 0; i < nums.length; i++) {
  //   if(nums.filter(item => item === nums[i]).length === 1) {
  //     return nums[i];
  //   }  
  // }
  /*
    线性复杂度的解法
    O(n)
    异或解法: a^a = 0 a^0 = a;  满足交换律和结合律
  */
  let ans = 0;
    for(let i = 0; i < nums.length; i++){
        ans ^= nums[i];
    }
    return ans;
}

/**
 * @author 马骁
 * @description 双端队列
 * @date 2021-05-25
 */

export class DoubleEndQueue {
  constructor() {
    this.list = {};
    this.first = 0;
    this.length = 0;
    this.last = 0;
  }

  // 头部添加
  addToHead(elem) {
    for(let i = this.length; i > 0; i--) {
      this.list[i] = this.list[i-1];
    }
    this.list[0] = elem;
    this.length ++ ;
  }

  // 尾部添加
  addToEnd(elem) {
    this.list[this.length] = elem;
    this.length++;
  }

  // 头部删除
  removeFromHead() {
    if(this.isEmpty()) return;
    const res = this.list[0];
    delete this.list[0];
    this.length --;
    for(let i = 0; i < this.length; i++) {
      this.list[i] = this.list[i+1]
    }
    delete this.list[this.length];
    return res;
  }

  // 尾部删除
  removeFromEnd() {
    if(this.isEmpty()) return;
    this.length --;
    const res = this.list[this.length];
    delete this.list[this.length];
    return res;
  }

  // 是否为空
  isEmpty() {
    return this.length === 0;
  }
}

/**
 * @author 马骁
 * @description 判断一个链表中是否有环
 * @date 2021-05-26
 */

export const hasCycle = (head) => { 
  /*
    // 正常人的思路
    let next = head.next;
    const arr = [];
    while(next) {
      if(arr.includes(next)) {
        return true;
      }else {
        arr.push(next)
      }
      next = next.next;
    }
    return false;
  */
  
  /*
    // 非碳基生物思路
    try {
      JSON.stringify(head);
      return true;
    } catch (error) {
      
    }
    return false;
  */

  /*
    // 大佬思路（快慢指针）
  */
  let p1 = head;
  let p2 = head;
  while(p1 && p2 && p2.next) {
      p1 = p1.next
      p2 = p2.next.next
      if(p1 === p2) {
          return true;
      }
  }
  return false;
};

/**
 * @author 马骁
 * @description 前序遍历二叉树
 * @date 2021-05-27
 */

export const preorderTraversal = (root) => {
  const arr = [];
  const lmr = (root) => {
    if(!root) return;
    arr.push(root.val);
    lmr(root.left);
    lmr(root.right);
  }
  lmr(root);
  return arr;
}

/**
 * @author 马骁
 * @description 二叉树后续遍历
 * @date 2021-05-28
 */

export const postorderTraversal = (root) => {
  // // 递归解法
  // const arr = [];
  // const rml = (root) => {
  //   if(!root) return;
  //   rml(root.left);
  //   rml(root.right);
  //   arr.push(root.val);
  // }
  // rml(root);
  // return arr;

  // 遍历解法
  if(!root) return [];
  const arr = [];
  const stack = [];
  stack.push(root);

  while (stack.length > 0) {
    const rt = stack.pop();
    if(rt.left) {
      stack.push(rt.left);
    }
    if(rt.right) {
      stack.push(rt.right);
    }
    arr.unshift(rt.val);
  }
  return arr;
}

/**
 * @author 马骁
 * @description 相交链表  [1,2,3,4] [5,7,8,2,3,4]
 * @date 2021-06-02
 */
export const getIntersectionNode = (headA, headB) => {
  if(!headA || !headB) return null;
  let pa = headA;
  let pb = headB;
  while(true) {
    if(pa === pb) {
      return pa;
    }
    pa = pa.next;
    pb = pb.next;
    if(pa === null && pb !== null) {
      pa = headB;
    }
    if(pb === null && pa !== null) {
      pb = headA;
    }
    if(pa === null && pb === null) {
      return null
    }
  }
};

/**
 * @author 马骁
 * @description 升序数组的两数之和
 * @date 2021-06-07
 */
export const twoSum = (numbers, target) => {
  const half = target / 2;
  for(let i = 0; i < numbers.length; i++) {
    if(numbers[i] > half) return [];
    const num = numbers.indexOf(target - numbers[i]);
    if(num > -1 && num !== i) {
      return [i + 1, num + 1];
    }
  }
  return []
}

/**
 * @author 马骁
 * @description 获取某个数字对应的excel表列(26 -> Z 27 -> AA)
 * @date 2021-06-08
 */
export const convertToTitle = function(columnNumber) {
  if(!columnNumber) return "";
  const mapArr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  const arr = [];
  while (columnNumber > 26) {
    columnNumber--;
    const yushu = columnNumber % 26;
    columnNumber = (columnNumber - yushu) / 26;
    arr.unshift(yushu);
  }
  arr.unshift(columnNumber - 1);
  const arrToChart = arr.map(item => {
    return mapArr[item]
  })
  return arrToChart.join("");
};

/**
 * @author 马骁
 * @description 找出数组中的多数元素
 * @date 2021-06-09
 */

export const majorityElement = function(nums) {
  const len = nums.length;
  const obj = {};
  for(let i = 0; i < len; i++) {
    if(!obj[nums[i]]) obj[nums[i]] = 0;
    obj[nums[i]] += 1;
    if(obj[nums[i]] > len/2) return nums[i];
  }
};

/**
 * @author 马骁
 * @description 给定一个Excel表格中的列名称，返回其相应的列序号
 * @date 2021-06-11
 */
export const titleToNumber = function(columnTitle) {
  const strArr = columnTitle.split('');
    const len = strArr.length;
    let count = 0;
    for(let i = 0; i < len; i++) {
        count += (26**(len - i - 1) * (strArr[i].charCodeAt() - 64));
    }
  return count;
};

/**
 * @author 马骁
 * @description 给定一个整数 n，返回 n! 结果尾数中零的数量
 * @date 2021-06-17
 */
export const trailingZeroes = (n) => {
  // // 常规方法，计算结果很容易超出js的数字范围
  // let count = 1;
  // while(n >= 1) {
  //   count *= n;
  //   n--;
  // }
  // console.log(count);
  // count = String(count);
  // if(count.indexOf("e") > 0) {
  //   const pointLength = /\.\d+/.exec(count)[0].length - 1;
  //   const pow = /\+\d*$/.exec(count)[0];
  //   console.log(pow, pointLength);
  //   return pow - pointLength
  // }
  // return /[0]*$/.exec(count)[0].length

  // 统计数字中出现5及5的倍数的个数
  let count = 0;
  while(n >=1) {
    n = Math.floor(n / 5);
    count+=n;
  }
  return count;
}

/**
 * @author 马骁
 * @description 数组中重复的数字
 * @date 2021-06-22
 */
export const findRepeatNumber = function(nums) {
  const obj = {};
  for(let i = 0; i < nums.length; i++) {
    if(!obj[nums[i]]) {
      obj[nums[i]] = 1;
    }else {
      return nums[i];
    }
  }
};

/**
 * @author 马骁
 * @description 快乐数，对数的每个位置进行平方和之后可以得到1；（如果不能得到1的话就会无限循环）
 * @date 2021-06-23
 */
export const isHappy = (n) => {
  // 常规map存储判断是否有相同的值
  // const map = new Map();
  // let str = String(n).split("");
  // let result = n;
  // while(!map.has(result)) {
  //   map.set(result, str);
  //   result = str.reduce((sum, item) => sum+=item*item, 0);
  //   str = String(result).split("");
  //   console.log(result, str, map);
  //   if(result === 1) return true;
  // }
  // return false;
  // 快慢指针解决
  let step2Num = n;
  while(true) {
    n = String(n).split("").reduce((sum, cur) => sum+cur**2, 0);
    step2Num = String(String(step2Num).split("").reduce((sum, cur) => sum+cur**2, 0)).split("").reduce((sum, cur) => sum+cur**2, 0)
    if(n === 1 || step2Num === 1) {
      return true;
    }
    if(step2Num === n){
      return false;
    }
  }
}
/**
 * @author 马骁
 * @description 移除链表中value为k的元素
 * @date 2021-06-28
 */

export const removeElements = function(head, val) {
  if(head === null) return [];
  let nodeVal = head.val;
  let preNode = head;
  let next = head.next;
  while(next) {
    if(next.val === val) {
      preNode.next = next.next;
    } else {
      preNode = next;
    }
    next = preNode.next;
  }
  if(nodeVal === val) {
    head = head.next;
  }
  return head;
};

/**
 * @author 马骁
 * @date 2021-06-29
 * @description 实现基础链表
 */
export class Node{
  constructor(value){
    this.value = value;
    this.next = undefined;
  }
}

export class LinkedList{
  constructor(){
    this.count = 0;
    this.head = undefined;
  };
  
  insertAt(element, index){
    if(index > this.count) index = this.count;
    if(index === 0) {
      const next = this.head;
      this.head = element;
      this.head.next = next;
    }else {
      let current = this.head;
      let preNode;
      for(let i = 0; i < index; i++) {
        preNode = current;
        current = current.next;
      }
      preNode.next = element;
      element.next = current;
    }
    this.count++;
  }

  push(element){
    this.insertAt(element, this.count > 0 ? this.count : 0);
  }

  removeAt(index){
    if(index < 0 || index > this.count) return undefined;
    if(index === 0) {
      this.head = this.head.next;
    }else {
      let current = this.head;
      let prev = this.head;
      for(let i = 0; i < index; i++) {
        prev = current;
        current = current.next;
      }
      prev.next = current.next;
      this.count--;
      return current;
    }
  }

  getElementAt(index){
    if(index < 0 || index > this.count) return undefined;
    if(index === 0) {
      return this.head;
    } else {
      let current = this.head;
      for(let i = 0; i < index; i++) {
        current = current.next;
      }
      return current;
    }
  }

  indexOf(element){
    let cur = this.head;
    let i = 0;
    while(cur) {
      if(cur.value === element) {
        return i;
      }
      cur = cur.next;
      i++;
    }
    return -1;
  }
}


/**
 * @author 马骁
 * @date 2021-06-29
 * @description 统计小于n的质数数量
 */
export const countPrimes = (n) => {
  let count = 0;
  const arr = Array(n + 1);
  for(let i = 2; i < n; i++) {
    if(!arr[i]){
      count++;
      for(let j = 2*i; j < n; j+=i) {
        arr[j] = true;
      }
    }
  }
  return count;
}

/**
 * @author 马骁
 * @description 给定两个字符串 s 和 t，判断它们是否是同构的。
 * @date 2021-07-02
 */
export const isIsomorphic = function(s, t) {
  if(new Set([...s]).size !== new Set([...t]).size) return false;
  const map = {};
  for(let i = 0; i < s.length; i++) {
    if(!map[s[i]]){
      map[s[i]] = t[i];
    } else {
      if(map[s[i]] !== t[i]) {
          return false;
      }
    }
  }
  return true;
};

/**
 * @author 马骁
 * @description 反转链表
 * 在遍历链表时，将当前节点的 next 指针改为指向前一个节点。由于节点没有引用其前一个节点，
 * 因此必须事先存储其前一个节点。在更改引用之前，还需要存储后一个节点。最后返回新的头引用。
 * @date 2021-07-06
 */
export const reverseList = function(head) {
  let prev = null;
  let curr = head;
  while(curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
};

/**
 * @author 马骁
 * @description 判断数组中是否存在重复元素
 * @date 2021-07-08
 */

export const containsDuplicate = function(nums) {
  const obj = {};
  for(let i = 0; i < nums.length; i++) {
    if(!obj[nums[i]]) {
      obj[nums[i]] = 1;
    }else {
      return true;
    }
  }
  return false;
  // 一行解决
  // return new Set([...nums]).size === nums.length;
};

/**
 * @author 马骁
 * @description 给定一个整数数组和一个整数 k，判断数组中是否存在两个不同的索引 i 和 j，使得 nums [i] = nums [j]，并且 i 和 j 的差的 绝对值 至多为 k 
 * @date 2021-07-09 
 * @params [1,0,1,1] 1
 */
export const containsNearbyDuplicate = function(nums, k) {
  const obj = {};
  for(let i = 0; i < nums.length; i++) {
    if(obj[nums[i]] == undefined) {
      obj[nums[i]] = i;
    } else {
      const num = Math.abs(i - obj[nums[i]]);
      if(num <= k) {
        return true;
      } else {
        obj[nums[i]] = i;
      }
    }
  }
  return false;
};

/**
 * @author 马骁
 * @description 翻转一棵二叉树。
 * @date 2021-07-16
 */
export const invertTree = function(root) {
  if(!root) return;
  const left = root.left;
  root.left = invertTree(root.right);
  root.right = invertTree(left);
  return root;
};

/**
 * @author 马骁
 * @description 给定一个无重复元素的有序整数数组 nums [0,1,2,4,5,7]。
 * 返回 恰好覆盖数组中所有数字 的 最小有序 区间范围列表。
 * 也就是说，nums 的每个元素都恰好被某个区间范围所覆盖，并且不存在属于某个范围但不属于 nums 的数字 x 。
 * [-1000000000,-9999,0,1,2,10,100,1000,999999999,1000000000]
 * @date 2021-08-06
 */

export var summaryRanges = function(nums) {
  let arr = [];
  const result = [];
  while(nums.length) {
    const item = nums.pop();
    if(arr[0]!=undefined && Math.abs((arr[0] - item )) !== 1) {
      if(arr.length === 1) {
        result.unshift(String(arr[0]));
      }else {
        result.unshift(`${arr[0]}->${arr[arr.length - 1]}`);
      }
      arr = [];
    }
    arr.unshift(item);
  }
  if(arr.length === 1) {
    result.unshift(String(arr[0]));
  }else {
    result.unshift(`${arr[0]}->${arr[arr.length - 1]}`);
  }
  return result;
};

/**
 * @author 马骁
 * @description 给你一个整数 n，请你判断该整数是否是 2 的幂次方。如果是，返回 true ；否则，返回 false 。
 * @date 2021-08-10
 */

export const isPowerOfTwo = function(n) {
  let i = 0;
  while(true) {
    if(2**i === n) {
      return true
    }else if(2**i > n){
      return false;
    }
    i++;
  }
};

/**
 * @author 马骁
 * @description 请判断一个链表是否为回文链表。1->2->2->1
 * @date 2021-08-11
 */

export const isPalindromeLink = function(head) {
  const vals = [];
  while(head){
    vals.push(head.val);
    head = head.next;
  }
  for(let i = 0, j = vals.length - 1; i < j; i++,j--) {
    if(vals[i] !== vals[j]) {
      return false;
    }
  }
  return true;
};

/**
 * @author 马骁
 * @description 给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。
 * @date 2021-08-13
 */

export const lowestCommonAncestor = function(root, p, q) {
    if(root.val > p.val && root.val > q.val) {
      return lowestCommonAncestor(root.right, p, q);
    }
    if(root.val < p.val && root.val < q.val) {
      return lowestCommonAncestor(root.left, p, q);
    }

    return root.val;
};

/**
 * @author 马骁
 * @description 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。
 * 注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。
"anagram"
"nagarams"
 * @date 2021-08-18
 */

export const isAnagram = function(s, t) {
  for(let i = 0; i < s.length; i++) {
    t = t.replace(s[i], '');
    if(t.length === 0) {
      if(i === s.length - 1){
        return true;
      }else {
        return false;
      }
    }
  }
  return false;
};

/**
 * @author 马骁
 * @description 给定一个二叉树，返回所有从根节点到叶子节点的路径。
 * @date 2021-08-20
 */
export const binaryTreePaths = function(root) {
  const result = [];
  const getVal = (root, path) => {
    if(!root.left && !root.right) {
      result.push(path);
    }
    if (root.left) {
      getVal(root.left, path + '->' + root.left.val);
    }
    if (root.right) {
      getVal(root.right, path + '->' + root.right.val);
    }
  }
  getVal(root, String(root.val));
  return result;
};

/**
 * @author 马骁
 * @description 给定一个非负整数 num，反复将各个位上的数字相加，直到结果为一位数。
 * @date 2021-08-25
 * @result 对9取余即可   发现规律 神奇解法
 */
export const addDigits = function(num) {
  const total = String(num).split('').reduce((sum, cur) => sum + Number(cur) , 0);
  if(total < 10) {
    console.log(total);
    return total;
  }else {
    return addDigits(total);
  }
};

/**
 * @author 马骁
 * @description 给你一个整数 n ，请你判断 n 是否为 丑数 。如果是，返回 true ；否则，返回 false 。
 * 丑数 就是只包含质因数 2、3 和/或 5 的正整数。
 * @date 2021-08-26
 */

export const isUgly = function(n) {
  const arr = [2, 3, 5];
  for(let val of arr) {
    while (n % val === 0) {
      n = n / val;
    }
  }
  if(n === 1) return true;
  return false;
};

/**
 * @author 马骁
 * @description 给定一个包含 [0, n] 中 n 个数的数组 nums ，找出 [0, n] 这个范围内没有出现在数组中的那个数。
 * @date 2021-08-26
 * [45,35,38,13,12,23,48,15,44,21,43,26,6,37,1,19,22,3,11,32,4,16,28,49,29,36,33,8,9,39,46,17,41,7,2,5,27,20,40,34,30,25,47,0,31,42,24,10,14]
 */

export const missingNumber = function(nums) {
  // const sortNums = nums.sort((prev, next) => prev - next);
  // if(sortNums[0] !== 0) return 0;
  // for(let i = 0; i < sortNums.length - 1; i++) {
  //   if(sortNums[i+1] - sortNums[i] !== 1) {
  //     return sortNums[i] + 1;
  //   }
  // }
  // return sortNums[sortNums.length - 1] + 1;
  const total = nums.reduce((sum, cur) => sum + cur);
  let realTotal = 0;
  for(let i = 0; i <= nums.length; i++) {
    realTotal += i;
  }
  return realTotal - total;
};

/**
 * @author 马骁
 * @date 2021-08-31
 */
var solution = function(isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function(n) {
    let start = 1, end = n, mid;
    while(true) {
      mid = Math.floor((end + start) / 2);
      if(isBadVersion(mid)) {
        end = mid
      }else {
        start = mid + 1;
      }
      if(start >= end) {
        return start;
      }
    }
  };
};

/**
 * @author 马骁
 * @description 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 * 必须在原数组上操作，不能拷贝额外的数组。
 * 尽量减少操作次数。
 * @date 2021-08-31
 */

export const moveZeroes = function(nums) {
  let i = 0;
  let len = nums.length;
  while(i < len) {
    if(nums[i] === 0) {
      nums.splice(i, 1);
      nums.push(0);
      len--;
    } else {
      i++;
    }
  }
  return nums;
};

/**
 * @author 马骁
 * @description 给定一种规律 pattern 和一个字符串 str ，判断 str 是否遵循相同的规律。
 * 这里的 遵循 指完全匹配，例如， pattern 里的每个字母和字符串 str 中的每个非空单词之间存在着双向连接的对应规律。
 * @date 2021-09-02
 * 输入: pattern = "abba", str = "dog cat cat dog"
 * abba [dog, cat, cat, dog]
 * 输出: true
 */

export const wordPattern = function(pattern, s) {
  const mapObj = {};
  const words = s.split(' ');
  if(pattern.length !== words.length) return false;
  for(let i = 0; i < pattern.length; i++) {
    const str = pattern[i];
    if(!mapObj[str]) {
      if(Object.values(mapObj).includes(words[i])) return false;
      mapObj[str] = words[i];
    }else if(mapObj[str] !== words[i]) {
      return false;
    }
  }
  return true;
};

/**
 * @author 马骁
 * @description Nim 游戏
 * 桌子上有一堆石头。
 * 每一回合，轮到的人拿掉 1 - 3 块石头。
 * 拿掉最后一块石头的人就是获胜者。
 * @date 2021-09-06
 */

export const canWinNim = function(n) {
  return n % 4 !== 0;
};

/**
 * @author 马骁
 * @description 给定一个整数，写一个函数来判断它是否是 3 的幂次方。如果是，返回 true ；否则，返回 false 
 * @date 2021-09-10
 */

export const isPowerOfThree = function(n) {
  while (n > 1) {
    n = n / 3;
  }
  return n === 1;
};

/**
 * @author 马骁
 * @description 给你一个整数 n ，对于 0 <= i <= n 中的每个 i ，计算其二进制表示中 1 的个数 ，返回一个长度为 n + 1 的数组 ans 作为答案。
 * @date 2021-09-13
 */

export var countBits = function(n) {
  return new Array(n).fill(0).map((item,index) => {
    return parseInt(index).toString(2).split('').filter(sub => sub!=='0').length || 0;
  });
};

/**
 * @author 马骁
 * @description 给定一个整数，写一个函数来判断它是否是 4 的幂次方。如果是，返回 true ；否则，返回 false 。
 * @date 2021-09-14
 */

export const isPowerOfFour = function(n) {
  while(n >= 4) {
    n = n / 4;
  }
  return n === 1;
};

/**
 * @author 马骁
 * @description 编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 char[] 的形式给出。
 * 不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。
 * @date 2021-09-14
 */

export const reverseString = function(s) {
  for(let i = 0,j = s.length - 1; i < j; i++,j--) {
    let tmp = s[i];
    s[i] = s[j];
    s[j] = tmp

    // 或者用解构赋值 [s[i], s[j]] = [s[j], s[i]]
  }
  return s;
};

/**
 * @author 马骁
 * @description 给你一个字符串 s ，仅反转字符串中的所有元音字母，并返回结果字符串。
 * @date 2021-09-15
 */

export const reverseVowels = function(s) {
  const arr = ['a', 'e', 'i', 'o', 'u'];
  s = s.split("");
  let i = 0;
  let j = s.length - 1;
  while(i < s.length && j > 0 && i < j) {
    let start = s[i];
    let end = s[j];
    if(arr.includes(start.toLowerCase())) {
      if(arr.includes(end.toLowerCase())) {
        [s[i], s[j]] = [s[j], s[i]];
        i++;
        j--;
      }else {
        j--;
      }
    }else {
      i++;
    }
  }
  return s.join("");
};

/**
 * @author 马骁
 * @description 给定两个数组，编写一个函数来计算它们的交集
 * @date 2021-09-16
 */
export const intersection = function(nums1, nums2) {
  const result = [];
  for(let i = 0; i < nums1.length; i++) {
    const index = nums2.indexOf(nums1[i]);
    if(index >= 0) {
      result.push(nums1[i]);
      nums2.splice(index, 1);
    }
  }
  return result;
  // return [...new Set(nums1.filter(item => nums2.includes(item)))];
};

/**
 * @author 马骁
 * @description 给定一个 正整数 num ，编写一个函数，如果 num 是一个完全平方数，则返回 true ，否则返回 false 。
 * @date 2021-09-18
 */
export const isPerfectSquare = function(num) {
  let i = 1;
  while(i < num*2 - 1) {
    num = num - i
  }
  return num === 0;
};

/**
 * @author 马骁
 * @description 猜数字游戏，调用guess函数获取猜测结果（1，-1，0）
 * @date 2021-09-22
 */

export const guessNumber = function(n) {
  // if(n === 1) return 1;
  // let start = 0;
  // let end = n;
  // let mid;
  // while (true) {
  //   mid = Math.floor((start + end) / 2);
  //   const result = guess(mid);
  //   if(result === 0) {
  //     return mid - 1;
  //   }else if(result === -1) {
  //     end = mid;
  //   }else if(result === 1) {
  //     start = mid + 1;
  //   }
  // }
};

/**
 * @author 马骁
 * @description 给定一个赎金信 (ransom) 字符串和一个杂志(magazine)字符串
 * 判断第一个字符串 ransom 能不能由第二个字符串 magazines 里面的字符构成。
 * 如果可以构成，返回 true ；否则返回 false
 * @date 2021-09-23
 */

export const canConstruct = function(ransomNote, magazine) {
  const arr1 = ransomNote.split('');
  const arr2 = magazine.split('');
  for(let i = 0; i < arr1.length; i++) {
    const index = arr2.indexOf(arr1[i]);
    if(index !== -1) {
      arr2.splice(index, 1);
    }else {
      return false;
    }
  }
  return true;
};

/**
 * @author 马骁
 * @description 给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。
 * @date 2021-09-24
 */

export const firstUniqChar = function(s) {
  const map = {};
  for(let i = 0; i < s.length; i++) {
    if(!map[s[i]]) {
      map[s[i]] = 1;
    }else {
      map[s[i]] += 1;
    }
  }
  for(let i = 0; i < s.length; i++) {
    if(map[s[i]] === 1) {
      return i;
    }
  }
  return -1;
};

/**
 * @author 马骁
 * @description 给定两个字符串 s 和 t，它们只包含小写字母。
 * 字符串 t 由字符串 s 随机重排，然后在随机位置添加一个字母。
 * 请找出在 t 中被添加的字母。
 * @date 2021-09-27
 */

export const findTheDifference = function(s, t) {
  // const tArr = t.split("");
  // for(let i = 0; i < s.length; i++) {
  //   const index = tArr.indexOf(s[i]);
  //   tArr.splice(index, 1);
  // }
  // return tArr.toString();
  const sMap = {};
  const tMap = {};
  for(let i = 0; i < t.length; i++) {
    if(!sMap[s[i]]) {
      sMap[s[i]] = 1;
    }else {
      sMap[s[i]] += 1;
    }
    if(!tMap[t[i]]) {
      tMap[t[i]] = 1;
    }else {
      tMap[t[i]] += 1;
    }
  }
  return Object.keys(tMap).filter(item => sMap[item] !== tMap[item]).toString();
};

/**
 * @author 马骁
 * @description 给定字符串 s 和 t ，判断 s 是否为 t 的子序列。
 * 字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。
 * @date 2021-09-28
 */
export const isSubsequence = function(s, t) {
  let i = 0;
  while(i < s.length) {
    const index = t.indexOf(s[i]);
    if(index === -1) {
      return false;
    }
    t = t.substr(index + 1);
    i++;
  }
  return true;
};

/**
 * @author 马骁
 * @description 计算给定二叉树的所有左叶子之和
 * @date 2021-09-29
 */
export const sumOfLeftLeaves = function(root) {
  let sum = 0;
  function add (root) {
      if(!root) return;
      const left = root.left;
      const right = root.right;
      if(left&&!left.left && !left.right){
          sum += left.val;
      }else {
          add(left)
      }
      if(right) {
          add(right);
      }
  }
  add(root);
  return sum;
};

/**
 * @author 马骁
 * @description 给定一个包含大写字母和小写字母的字符串，找到通过这些字母构造成的最长的回文串。
 * 在构造过程中，请注意区分大小写。比如 "Aa" 不能当做一个回文字符串。
 * @date 2022-10-11
*/

export const longestPalindrome = function(s) {
  const obj = {};
  let count = 0;
  let hasSingle = false;
  for(let i of s) {
    if(!obj[i]) {
      obj[i] = 0;
    }
    obj[i] += 1;
  }
  Object.values(obj).forEach(item => {
    if(item % 2 === 0) {
      count += item;
    }else {
      hasSingle = true;
      count += item - 1;
    }
  })
  return hasSingle ? count + 1 : count;
};

/**
 * @author 马骁
 * @description 写一个程序，输出从 1 到 n 数字的字符串表示。
 * 1. 如果 n 是3的倍数，输出“Fizz”；
 * 2. 如果 n 是5的倍数，输出“Buzz”；
 * 3.如果 n 同时是3和5的倍数，输出 “FizzBuzz”。
 * @date 2021-10-12
 */

export const fizzBuzz = function(n) {
  return Array.from({length: n}, (item, index) => {
    item = index + 1;
    if(item % 3 === 0 && item % 5 === 0) {
      return 'FizzBuzz';
    }else if(item % 3 === 0 && item % 5 !== 0) {
      return 'Fizz';
    }else if(item % 5 === 0 && item % 3 !== 0) {
      return 'Buzz';
    }else {
      return item;
    }
  })
};

/**
 * @author 马骁
 * @description 给你一个非空数组，返回此数组中 第三大的数 。如果不存在，则返回数组中最大的数。
 * @date 2021-10-12
 */

export const thirdMax = function(nums) {
  if(nums.length >= 3) {
    for(let j = 0 ; j <= 3; j++) {
      for(let i = 0; i < nums.length - 1; i++) {
        if(nums[i] < nums[i+1]) {
          [nums[i], nums[i+1]] = [nums[i+1], nums[i]];
        }
      }
    }
    return nums[2];
  }else {
    return Math.max(...nums);
  }
};

/**
 * @author 马骁
 * @description 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和并同样以字符串形式返回。
 * 你不能使用任何內建的用于处理大整数的库（比如 BigInteger）， 也不能直接将输入的字符串转换为整数形式。
 * @date 2021-10-14
 * 456
 * 77
 */
export const addStrings = function(num1, num2) {
    let i = num1.length - 1, j = num2.length - 1, add = 0;
    const result = [];
    while(i >=0 || j >=0 || add!== 0) {
      let x = i >= 0 ? +num1.charAt(i) : 0;
      let y = j >= 0 ? +num2.charAt(j) : 0;
      const res = x + y + add;
      result.unshift(res % 10)
      add = Math.floor(res / 10);
      i--;
      j--;
    }
    return result.join('');
};

/**
 * @author 马骁
 * @description 你总共有 n 枚硬币，并计划将它们按阶梯状排列。对于一个由 k 行组成的阶梯，其第 i 行必须正好有 i 枚硬币。阶梯的最后一行 可能 是不完整的。
 * 给你一个数字 n ，计算并返回可形成 完整阶梯行 的总行数。
 * @date 2021-10-19
 */
export const arrangeCoins = function(n) {
  
};

/**
 * @author 马骁 
 * @description 给你一个含 n 个整数的数组 nums ，其中 nums[i] 在区间 [1, n] 内。请你找出所有在 [1, n] 范围内但没有出现在 nums 中的数字，并以数组的形式返回结果。
 * @date 2021-10-20
 */
export const findDisappearedNumbers = function(nums) {
  const len = nums.length;
  const result = [];
  for(let i = 1; i <= len; i++) {
    if(!nums.includes(i)) {
      result.push(i);
    }
  }
  return result;
};

/**
 * @author 马骁
 * @description 给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。
 * 不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。
 * @date 2021-11-10
 */
export const removeDuplicates = function (nums) {
  const n = nums.length;
  if(n === 0) return 0;
  let slow = 0, fast = 0;
  while(fast < n) {
    if(nums[fast] === nums[slow]) {
      fast++;
    }else {
      slow++;
      nums[slow] = nums[fast];
      fast++;
    }
  }
  return slow + 1;
}

/**
 * @author 马骁
 * @description 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
 * 请你将两个数相加，并以相同形式返回一个表示和的链表。
 * @date 2022-02-16
 */
// export const addTwoNumbers = (l1, l2) => {
//   let preVal = 0;
//   let result = new ListNode(0);
//   let head = result.next;
  
//   while(l1 || l2 || preVal) {
//     if(!head) head = new ListNode(0);
//     let curSum;
//     if(l1 && l2) {
//       curSum = l1.value + l2.value + preVal;
//     }else if(l1 && !l2) {
//       curSum = l1.value + preVal;
//     }else if(!l1 && l2) {
//       curSum = l2.value + preVal;
//     }else if(!l1 && !l2 && preVal) {
//       curSum = preVal;
//     }
//     if(curSum > 9) {
//       head.value = curSum % 10;
//       preVal = Math.floor(curSum / 10);
//     }else {
//       head.value = curSum;
//       preVal = 0;
//     }
//     l1 = l1.next;
//     l2 = l2.next;
//     head = head.next
//   }
//   return result.next;
// }

/**
 * @author 马骁
 * @description 给你一个字符串 s ，根据下述规则反转字符串：
 * 所有非英文字母保留在原有位置
 * 所有英文字母（小写或大写）位置反转。
 * @date 2022-02-23
 */

export const reverseOnlyLetters = (s) => {
  if(s.length < 2) return s;
  s = s.split('');
  let left = 0;
  let right = s.length - 1;
  let reg = /[a-zA-Z]/i;
  while(left < right) {
    if(!reg.test(s[left])) {
      left++;
    }else if(!reg.test(s[right])) {
      right--;
    }else {
      [s[left], s[right]] = [s[right], s[left]];
      left++;
      right--;
    }
  }
  return s.join('');
}

/**
 * @author 马骁
 * @description 用一个大小为 m x n 的二维网格 grid 表示一个箱子。你有 n 颗球。箱子的顶部和底部都是开着的。
 * 箱子中的每个单元格都有一个对角线挡板，跨过单元格的两个角，可以将球导向左侧或者右侧。
 * 将球导向右侧的挡板跨过左上角和右下角，在网格中用 1 表示。
 * 将球导向左侧的挡板跨过右上角和左下角，在网格中用 -1 表示。
 * 在箱子每一列的顶端各放一颗球。每颗球都可能卡在箱子里或从底部掉出来。如果球恰好卡在两块挡板之间的 "V" 形图案，或者被一块挡导向到箱子的任意一侧边上，就会卡住。
 * 返回一个大小为 n 的数组 answer ，其中 answer[i] 是球放在顶部的第 i 列后从底部掉出来的那一列对应的下标，如果球卡在盒子里，则返回 -1。
 * @date 2022-02-24
 */

export const findBall = function(grid = [[1,1,1,-1,-1],[1,1,1,-1,-1],[-1,-1,-1,1,1],[1,1,1,1,-1],[-1,-1,-1,-1,-1]]) {
    
};

/**
 * @author 马骁
 * @description 复数 可以用字符串表示，遵循 "实部+虚部i" 的形式，并满足下述条件：
 * 实部 是一个整数，取值范围是 [-100, 100]
 * 虚部 也是一个整数，取值范围是 [-100, 100]
 * i2 == -1
 * 给你两个字符串表示的复数 num1 和 num2 ，请你遵循复数表示形式，返回表示它们乘积的字符串。
 */
 export const complexNumberMultiply = function(num1='1+-1i', num2='2+-1i') {
  const arr1 = num1.split('+');
  const arr2 = num2.split('+');
  const newArr = [];
  const num1shibu = Number(arr1[0]);
  const num2shibu = Number(arr2[0]);
  const num1xubu = parseInt(arr1[1]);
  const num2xubu = parseInt(arr2[1]);

  newArr[0] = num1shibu * num2shibu;
  newArr[1] = num1shibu * num2xubu;
  newArr[2] = num1xubu * num2shibu;
  newArr[3] = num1xubu * num2xubu;

  const num = newArr[0] + (newArr[3] * -1);
  const iNum = (newArr[1] + newArr[2]) + 'i';

  return `${num} + ${iNum}`;
};

/**
 * @author 马骁
 * @description 将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。
 * 之后，你的输出需要从左往右逐行读取，产生出一个新的字符串。请你实现这个将字符串进行指定行数变换的函数：
 * @date 2022-03-01
 */

export const convert = (s, numRows) => {
  const t = numRows * 2 - 2;
  const column = Math.ceil(s.length / t) * t;
  const result = new Array(numRows).fill(0).map(item => new Array(column).fill(0));

  for(let i = 0, x = 0, y = 0; i < s.length; i++) {
    result[x][y] = s[i];
    if(i % t < numRows - 1) {
      ++x;
    }else {
      --x;
      ++y;
    }
  }
}

/**
 * @author 马骁
 * @description 蜡烛之间的盘子，对于传入的每个查询给出对应的盘子数量。盘子需要满足两侧都有蜡烛
 * @date 2022-03-08
 */

export const platesBetweenCandles = function(s = "***|**|*****|**||**|*", queries = [[1,17],[4,5],[14,17],[5,11],[15,16]]) {
  const queryLen = queries.length;
  const result = [];
  for(let i = 0; i < queryLen; i++) {
    let [left, right] = queries[i];
    while(s[left] !== '|' && left <= right) {
      left++;
    }
    while(s[right] !== '|' && left <= right) {
      right--;
    }
    result[i] = s.split("").filter((item, index) => item === '*' && index > left && index < right + 1).length; 
  }
  return result;
};

/**
 * @author 马骁
 * @description N叉树的前序遍历
 * @date 2022-03-10
 */
export const preorder = (root) => {
  if(!root) return [];
  const result = [];
  const stack = [root];

  while(stack.length > 0) {
    const cur = stack.pop();
    result.push(cur.val);
    const children = cur.children.reverse();
    stack.push(...children);
  }
  return result;
}

/**
 * @author 马骁
 * @description 假设 Andy 和 Doris 想在晚餐时选择一家餐厅，并且他们都有一个表示最喜爱餐厅的列表，每个餐厅的名字用字符串表示。
 * 你需要帮助他们用最少的索引和找出他们共同喜爱的餐厅。 如果答案不止一个，则输出所有答案并且不考虑顺序。 你可以假设答案总是存在。
 * @date 2022-03-14
 */

export const findRestaurant = function(list1, list2) {
  let minIndex = Number.MAX_SAFE_INTEGER;
  let result = [];

  for(let i = 0; i < list1.length; i++) {
    const index = list2.indexOf(list1[i])
    if(index > 0) {
      if((index + i) < minIndex){
        minIndex = index + i;
        result = [list1[i]];
      }else if((index + i) === minIndex) {
        result.push(list1[i]);
      }
    }
  };

  return result;
};

/**
 * @author 马骁
 * @description 给你一个整数数组 nums ，请你找出 nums 子集 按位或 可能得到的 最大值 ，并返回按位或能得到最大值的 不同非空子集的数目 。
 * 如果数组 a 可以由数组 b 删除一些元素（或不删除）得到，则认为数组 a 是数组 b 的一个 子集 。如果选中的元素下标位置不一样，则认为两个子集 不同 。
 * 对数组 a 执行 按位或 ，结果等于 a[0] OR a[1] OR ... OR a[a.length - 1]（下标从 0 开始）。
 * @date 2022-03-15
 */

export const countMaxOrSubsets = function(nums) {
  const length = nums.length;
  let result = 0;
  let max = 0;

  if(length === 0) return 0;
  if(length === 1) return 1;

  for(let i = 0; i < length; i++) {
    
    for(let j = i; j < length; j++) {
      const calculate = nums[i] | nums[j];
      if(calculate === max) {
        result++;
      }else if(calculate > max || (calculate | max) === max) {
        result = 1;
        max = calculate;
      }
    }
  }
  return result;
};

/**
 * @author 马骁
 * @description 给定一个二叉搜索树 root 和一个目标结果 k，如果 BST 中存在两个元素且它们的和等于给定的目标结果，则返回 true。
 * @date 2022-03-21
 */

export const findTarget = (root, k) => {
  // // 利用数组记录每次节点与k的差值，遍历时先判断节点值在不在数组中;
  // const result = [];
  // let flag = false;
  // const loop = (root) => {
  //   if(!root) return;
  //   if(result.includes(root.val)) flag = true;
  //   result.push(k - root.val);
  //   loop(root.left);
  //   loop(root.right);
  // }

  // loop(root);
  // return flag;
  
  const result = [];
  const loop = (root, k) => {
    if(!root) return false;
    if(result.includes(k - root.val)) return true;
    result.push(root.val);

    return loop(root.left, k) || loop(root.right, k);
  }

  return loop(root, k);
};