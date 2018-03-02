class Promise {
  constructor(handler) {
    const ref = this
    this.status = 'pending'

    const resolveNext = (ref, value) => {
      if (ref && ref.deferred) {
        ref.status = 'resolved'
        var nValue = ref.deferred(value)
        resolveNext(ref.next, nValue)
      }
    }

    const resolve = (value) => {
      ref.status = 'resolved'
      if (ref.next) {
        resolveNext(ref.next, value)
      }
    }

    if (handler && handler.constructor && handler.constructor.name == 'Function') {
      setTimeout(() => {
        handler(resolve)
      }, 0)
    }
  }

  then(deferred) {
    this.next = new Promise()
    this.next.deferred = deferred
    return this.next
  }
}

module.exports = Promise
