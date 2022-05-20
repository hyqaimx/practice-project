class MyPromise {
  constructor(callback){
    this.info = '';
    this.status = 'pending';
    this.fullfieldCallback = [];
    this.failedCallback = [];
    const resolve = (info) => {
      if(this.status === 'pending') {
        this.status = 'fullfield';
        this.info = info;
        while(this.fullfieldCallback.length) {
          this.fullfieldCallback.shift()();
        }
      }
    }
    const reject = (err) => {
      if(this.status === 'pending') {
        this.status = 'failed';
        this.info = err;
        while(this.failedCallback.length) {
          this.fullfieldCallback.shift()();
        }
      }
    }

    callback(resolve, reject);
  }

  then(onFullfield, onRejected) {
    onFullfield = typeof onFullfield === 'function' ? onFullfield : () => onFullfield;
    onRejected = typeof onRejected === 'function' ? onRejected : () => onRejected;

    const promise = new MyPromise((resolve, reject) => {
      if(this.status === 'pending') {
        this.fullfieldCallback.push(() => {
          const result = onFullfield(this.info);
          if(result instanceof MyPromise) {
            result.then(resolve, reject);
          }else {
            resolve(result);
          }
        });
        this.failedCallback.push(() => {
          const result = onRejected(this.info);
          if(result instanceof MyPromise) {
            result.then(resolve, reject);
          }else {
            reject(result);
          }
        })
      }else if(this.status === 'fullfield') {
        const result = onFullfield(this.info);
        if(result instanceof MyPromise) {
          result.then(resolve, reject);
        }else {
          resolve(result);
        }
      }else if(this.status === 'failed') {
        const result = onRejected(this.info);
          if(result instanceof MyPromise) {
            result.then(resolve, reject);
          }else {
            reject(result);
          }
      }
    })
    
    return promise;
  }
}
MyPromise.all = (arr) => {
  return new MyPromise((resolve, reject) => {
    const len = arr.length;
    const result = [];
    for(let i = 0; i < len; i++) {
      arr[i].then((info) => {
        result.push(info);
        if(result.length === len) {
          resolve(result);
        }
      }, reject);
    }
  })
}

MyPromise.race = (arr) => {
  return new MyPromise((resolve, reject) => {
    for(let i = 0; i < arr.length; i++) {
      arr[i].then(resolve, reject);
    }
  })
}

export default MyPromise;