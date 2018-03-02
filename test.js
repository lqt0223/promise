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
  throw 'a test error in then body'
}).then((value) => {
  console.log(value)
  return timeout(2, '2')
}).catch((e) => {
  console.log(e)
  throw 'a test error in catch body'
}).then((value) => {
  console.log(value)
  return timeout(3, '3')
}).then((value) => {
  console.log(value)
}).catch((e) => {
  console.log(e)
})

// expected result:
// the console output will be: (after 1s) -> '1\na test error in then body\na test error in catch body'