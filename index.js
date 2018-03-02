class Promise {
  constructor(handler) {
    const ref = this
    this.status = 'pending'

    const resolveNext = (ref, value) => {
      if (ref && ref.handler) {
        ref.status = 'resolved'
        var nValue = ref.handler(value)
        resolveNext(ref.next, nValue)
      }
    }

    const rejectNext = (ref, reason) => {
      if (!ref) {
        console.log('UnhandledPromiseRejectionWarning:', reason)
      } else {
        ref.status = 'rejected'
        if (ref.errorHandler) {
          var nValue = ref.errorHandler(reason)
          resolveNext(ref.next, nValue)
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
