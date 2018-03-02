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

var p1 = Promise.resolve(1).then((value) => {
  console.log(value, 'p1')
})

var p2 = Promise.reject(2).then((value) => {
  console.log(value, 'p2')
}).catch((e) => {
  console.log(e, 'p2 error')
})

var p3 = Promise.all([timeout(1, '1'), timeout(2, '2'), timeout(3, '3')]).then((values) => {
  console.log(values, 'p3')
})

var p4 = Promise.race([timeout(3, '1'), timeout(1, '2'), timeout(2, '3')]).then((value) => {
  console.log(value, 'p4')
})

// expected result:
// the console output will be: "1 'p1'\n2 'p2 error'" -> (after 1s) -> '2 p4' -> (after 2s) -> "[ '1', '2', '3' ] 'p3'"
