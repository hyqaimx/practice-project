class Node {
  constructor(value){
    this.val = value;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree {
  constructor(){
    this.root = null;
  }

  insert(value) {
    if(!this.root) {
      this.root = new Node(value);
    }else {
      const insertNode = (root) => {
        if(root.val > value) {
          if(root.left === null) {
            root.left = new Node(value);
          }else {
            insertNode(root.left);
          }
        }else {
          if(root.right === null) {
            root.right = new Node(value);
          }else {
            insertNode(root.right);
          }
        }
      }
      insertNode(this.root);
    };
  }

  midOrderMap(callback) {
    if(!this.root) return;
    const midMapTree = (root, callback) => {
      if(!root) return;
      midMapTree(root.left, callback);
      callback(root.val);
      midMapTree(root.right, callback);
    }
    midMapTree(this.root, callback);
  }

  preOrderMap(callback) {
    if(!this.root) return;
    const preMapTree = (root, callback) => {
      if(!root) return;
      callback(root.val);
      preMapTree(root.left, callback);
      preMapTree(root.right, callback);
    }
    preMapTree(this.root, callback);
  }

  postOrderMap(callback) {
    if(!this.root) return;
    const postMapTree = (root, callback) => {
      if(!root) return;
      postMapTree(root.left, callback);
      postMapTree(root.right, callback);
      callback(root.val);
    };
    postMapTree(this.root, callback);
  }

  search(val) {
    if(!this.root) return false;
    const searchNode = (root) => {
      if(!root) return false;
      if(root.val > val) {
        return searchNode(root.left);
      }else if(root.val < val) {
        return searchNode(root.right);
      }else {
        return true;
      }
    }
    return searchNode(this.root);
  }

  findMinVal(root) {
    if(!root.left) {
      return root;
    }else {
      return this.findMinVal(root.left);
    }
  }

  minVal() {
    if(!this.root) return 0;
    return this.findMinVal(this.root);
  }

  findMaxVal(root) {
    if(!root.right) {
      return root;
    }else {
      return this.findMaxVal(root.right);
    }
  }

  maxVal() {
    if(!this.root) return 0;
    return this.findMaxVal(this.root);
  }

  remove(value) {
    if(!this.root) return null;
    const removeNode = (root, value) => {
      if(root.val > value) {
        root.left = removeNode(root.left, value);
        return root;
      }else if(root.val < value) {
        root.right = removeNode(root.right, value);
        return root;
      }else {
        // 找到要删除的点之后
        if(!root.left && !root.right) {
          root = null;
          return null;
        }else if(root.left && !root.right) {
          root = root.left;
          return root;
        }else if(root.right && !root.left) {
          root = root.right;
          return root;
        }else if(root.left && root.right) {
          const lMax = this.findMaxVal(root.left);
          root.val = lMax.val;
          root.left = removeNode(root.left, lMax.val);
          return root;
        }
      }
    }
    this.root = removeNode(this.root, value);
  }

  deep(){
    return this.getDeep(this.root);
  }

  getDeep(root){
    if(!root) return -1;
    return Math.max(this.getDeep(root.left), this.getDeep(root.right)) + 1;
  }

}

export class AVLTree extends BinarySearchTree {
  constructor(props) {
    super(props);
    this.root = null;
  }

  getBalanceFactor(node) {
    return this.getDeep(node.left) - this.getDeep(node.right);
  }

  rotateLL(node) {
    const tmp = node.left;
    node.left = tmp.right;
    tmp.right = node;
    return tmp;
  }

  rotateRR(node) {
    const tmp = node.right;
    node.right = tmp.left;
    tmp.left = node;
    return tmp;
  }

  rotateLR(node) {
    // const tmp = node.left;
    // const tmpr = tmp.right;
    // tmp.right = tmpr.left;
    // tmpr.left = tmp;

    // node.left = tmpr.right;
    // tmpr.right = node;
    // return tmpr;
    node.left = this.rotateRR(node.left);
    return this.rotateLL(node);
  }

  rotateRL(node) {
    // const tmp = node.right;
    // const tmpl = tmp.left;
    // tmp.left = tmpl.right;
    // tmpl.right = tmp;

    // node.right = tmpl.left;
    // tmpl.left = node;
    node.right = this.rotateLL(node.right);
    return this.rotateRR(node);
  }

  insert(key){
    this.root = this.insertNode(this.root, key);
  }

  insertNode(root, key){
    
    if(!root) {
      return new Node(key);
    } else if(key < root.val) {
      root.left = this.insertNode(root.left, key);
    } else if(key > root.val) {
      root.right = this.insertNode(root.right, key);
    } else {
      return root;
    }

    const balance = this.getBalanceFactor(root);
    if(balance === 2) {
      if(root.left.val > key) {
        root = this.rotateLL(root);
      }else {
        // 左右
        return this.rotateLR(root);
      }
    }else if(balance === -2){
      if(root.right.val < key) {
        // 右右
        root = this.rotateRR(root);
      } else {
        // 右左
        return this.rotateRL(root);
      }
    }
    return root;
  }

  delete(key) {
    this.root = this.deleteNode(this.root, key);
  }

  deleteNode(root, key) {
    let node;
    if(root === null) {
      node = null;
    }
    if(root.val < key) {
      root.right = this.deleteNode(root.right, key);
      node = root;
    }else if(root.val > key) {
      root.left = this.deleteNode(root.left, key);
      node = root;
    }else {
      if(!root.left && !root.right) {
        root = null;
        node = root;
      }
      if(!root.left && root.right) {
        root = root.right;
        node = root;
      }
      if(root.left && !root.right) {
        root = root.left;
        node = root;
      }
      if(root.left && root.right) {
        const tmp = super.findMinVal(root.right);
        tmp.right = this.deleteNode(root.right, tmp.val);
        tmp.left = root.left;
        root = tmp;
        node = root;
      }
    }

    const balance = this.getBalanceFactor(node);
    if(balance === 2) {
      const balanceLeft = this.getBalanceFactor(node.left);
      if(balanceLeft === 1) {
        return this.rotateLL(node);
      }else {
        node.left = this.rotateRR(node.left);
        return this.rotateRR(node);
      }
    }
    if(balance === -2) {
      const balanceRight = this.getBalanceFactor(node.right);
      if(balanceRight === -1) {
        return this.rotateRR(node);
      }else {
        node.right = this.rotateLL(node.right);
        return this.rotateLL(node);
      }
    }

  }
}