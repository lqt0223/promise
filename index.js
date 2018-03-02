class Promise {
  constructor(handler) {
    const ref = this
    this.status = 'pending'

    const _resolve = (p, ref, cb) => {
      p.then((value) => {
        cb(value)
      })
      p.next = ref.next
    }

    const _resolveNext = (ref, nValue) => {
      if (ref.next) {
        if (!(nValue && nValue.constructor && nValue.constructor.name == 'Promise')) {
          resolveNext(ref.next, nValue)
        } else {
          _resolve(nValue, ref, (nnValue) => {
            resolveNext(ref.next, nnValue)
          })
        }
      }
    }

    const resolveNext = (ref, value) => {
      ref.status = 'resolved'
      if (ref.handler) {
        try {
          var nValue = ref.handler(value)
          _resolveNext(ref, nValue)
        } catch (e) {
          rejectNext(ref, e)
        }
      }
    }

    const rejectNext = (ref, reason) => {
      if (!ref) {
        console.log('UnhandledPromiseRejectionWarning:', reason)
      } else {
        ref.status = 'rejected'
        if (ref.errorHandler) {
          try {
            var nValue = ref.errorHandler(reason)
            _resolveNext(ref, nValue)
          } catch (e) {
            rejectNext(ref.next, e)
          }
        } else {
          rejectNext(ref.next, reason)
        }
      }
    }

    const resolve = (value) => {
      ref.status = 'resolved'
      if (ref.next) {
        resolveNext(ref.next, value)
      }
    }

    const reject = (reason) => {
      ref.status = 'rejected'
      if (ref.next) {
        rejectNext(ref.next, reason)
      }
    }

    if (handler && handler.constructor && handler.constructor.name == 'Function') {
      setTimeout(() => {
        try {
          handler(resolve, reject)
        } catch (e) {
          reject(e)
        }
      }, 0)
    }
  }

  then(handler, errorHandler) {
    this.next = new Promise()
    if (handler) {
      this.next.handler = handler
    }
    if (errorHandler) {
      this.next.errorHandler = errorHandler
    }
    return this.next
  }

  catch(errorHandler) {
    return this.then((value) => {
      return value
    }, errorHandler)
  }

  static resolve(value) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(value)
      }, 0)
    })
  }

  static reject(value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(value)
      }, 0)
    })
  }

  static all(promises) {
    var len = promises.length
    var resolved = 0
    var values = new Array(len)
    return new Promise((resolve, reject) => {
      promises.forEach((promise, index) => {
        if (!(promise && promise.constructor && promise.constructor.name == 'Promise')) {
          promise = Promise.resolve(promise)
        }
        promise.then((value) => {
          values[index] = value
          resolved++
          if (resolved == len) {
            resolve(values)
          }
        }).catch((e) => {
          reject(e)
        })
      })
    })
  }

  static race(promises) {
    var resolved = 0
    return new Promise((resolve, reject) => {
      promises.forEach((promise) => {
        if (!(promise && promise.constructor && promise.constructor.name == 'Promise')) {
          promise = Promise.resolve(promise)
        }
        promise.then((value) => {
          resolved++
          if (resolved == 1) {
            resolve(value)
          }
        }).catch((e) => {
          reject(e)
        })
      })
    })
  }
}

module.exports = Promise
