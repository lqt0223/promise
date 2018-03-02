class Promise {
  constructor(handler) {
    const ref = this
    const resolve = (value) => {
      if (ref.deferred) {
        ref.deferred(value)
      }
    }

    if (handler && handler.constructor && handler.constructor.name == 'Function') {
      setTimeout(() => {
        handler(resolve)
      }, 0)
    }
  }

  then(deferred) {
    this.deferred = deferred
  }
}

module.exports = Promise
