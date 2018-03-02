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
        var nValue = ref.handler(value)
        _resolveNext(ref, nValue)
      }
    }

    const rejectNext = (ref, reason) => {
      if (!ref) {
        console.log('UnhandledPromiseRejectionWarning:', reason)
      } else {
        ref.status = 'rejected'
        if (ref.errorHandler) {
          var nValue = ref.errorHandler(reason)
          _resolveNext(ref, nValue)
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
        handler(resolve, reject)
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
}

module.exports = Promise
