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

timeout(1, '1').then((value) => {
  console.log(value)
  return timeout(2, '2')
}).then((value) => {
  console.log(value)
  return timeout(3, '3')
}).then((value) => {
  console.log(value)
})

// expected result:
// the console output will be: (after 1s) -> '1' -> (after 2s) -> '2' -> (after 3s) -> '3'