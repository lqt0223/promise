var Promise = require('.')

// test code
var https = require('https')

var fetch = function(url) {
  return new Promise((resolve, reject) => {
    var req = https.get(url, (res) => {
      var buffer = new Buffer([])
      res.on("data", (data) => {
        buffer = Buffer.concat([buffer, data])
      })
      res.on("end", () => {
        resolve(buffer.toString())
      })
    })
    req.on('error', (e) => {
      reject(e)
    })
  })
}

var timeout = function(ms, value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value)
    }, ms * 1000)
  })
}

var p = Promise.resolve()

p.then(() => {
  console.log('first branch: 1')
  return timeout(2)
}).then(() => {
  console.log('first branch: 2')
})

p.then(() => {
  return timeout(1)
}).then(() => {
  console.log('second branch: 1')
  return timeout(2)
}).then(() => {
  console.log('second branch: 2')
})

// expected result:
// the console will print the next four results every one second:
//   first branch: 1
//   second branch: 1
//   first branch: 2
//   second branch: 2
