class Promise {
  constructor(handler) {
    if (handler && handler.constructor && handler.constructor.name == 'Function') {
      handler()
    }
  }
}

module.exports = Promise