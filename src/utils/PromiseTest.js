export class PromiseTest {
  constructor(executor) {
    // 初始化值
    this.PromiseResult = null // 终值
    this.PromiseState = 'pending' // 状态
    this.onFulfilledCallbacks = [] // 保存成功回调
    this.onRejectedCallbacks = [] // 保存失败回调
    // 初始化this指向
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
    // 执行传进来的函数
    try {
      // 执行传进来的函数
      executor(this.resolve, this.reject)
    } catch (e) {
      // 捕捉到错误直接执行reject
      this.reject(e)
    }
  }

  resolve(value) {
    // state是不可变的
    if (this.PromiseState !== 'pending') return
    // 如果执行resolve，状态变为fulfilled
    this.PromiseState = 'fulfilled'
    // 终值为传进来的值
    this.PromiseResult = value;
    while (this.onFulfilledCallbacks.length) {
      this.onFulfilledCallbacks.shift()(this.PromiseResult)
    }
  }

  reject(reason) {
    // state是不可变的
    if (this.PromiseState !== 'pending') return
    // 如果执行reject，状态变为rejected
    this.PromiseState = 'rejected'
    // 终值为传进来的reason
    this.PromiseResult = reason;
    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()(this.PromiseResult)
    }
  }
  then(onFulfilled, onRejected) {
    // 接收两个回调 onFulfilled, onRejected

    // 参数校验，确保一定是函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }


    var thenPromise = new PromiseTest((resolve, reject) => {

        const resolvePromise = cb => {
            try {
                const x = cb(this.PromiseResult)
                if (x === thenPromise) {
                    // 不能返回自身哦
                    throw new Error('不能返回自身。。。')
                }
                if (x instanceof PromiseTest) {
                    // 如果返回值是Promise
                    // 如果返回值是promise对象，返回值为成功，新promise就是成功
                    // 如果返回值是promise对象，返回值为失败，新promise就是失败
                    // 谁知道返回的promise是失败成功？只有then知道
                    x.then(resolve, reject)
                } else {
                    // 非Promise就直接成功
                    resolve(x)
                }
            } catch (err) {
                // 处理报错
                reject(err)
                throw new Error(err)
            }
        }

        if (this.PromiseState === 'fulfilled') {
            // 如果当前为成功状态，执行第一个回调
            resolvePromise(onFulfilled)
        } else if (this.PromiseState === 'rejected') {
            // 如果当前为失败状态，执行第二个回调
            resolvePromise(onRejected)
        } else if (this.PromiseState === 'pending') {
            // 如果状态为待定状态，暂时保存两个回调
            // 如果状态为待定状态，暂时保存两个回调
            this.onFulfilledCallbacks.push(resolvePromise.bind(this, onFulfilled))
            this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected))
        }
    })

    // 返回这个包装的Promise
    return thenPromise
  }

}