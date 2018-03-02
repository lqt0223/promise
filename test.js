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

var validUrl = 'https://jsonplaceholder.typicode.com/posts/1'
var invalidUrl = 'https://whatever'

var p1 = fetch(validUrl)
var p2 = fetch(invalidUrl)
var p3 = fetch(invalidUrl)
var p4 = fetch(invalidUrl)

p1.then((resp) => {
  console.log(resp, 'p1')
})

p2.then((resp) => {
  console.log(resp, 'p2')
}, (error) => {
  console.log(error, 'p2')
})

p3.then((resp) => {
  console.log(resp, 'p3')
}).catch((error) => {
  console.log(error, 'p3')
}).then(() => {
  console.log('the promise chain is resolved', 'p3')
})

p4.then((resp) => {
  console.log(resp, 'p4')
}).then(() => {
  console.log('the promise chain is resolved', 'p4')
})
// expected result:
// the first promise chain will print out server response
// the second promise chain will print out error information
// the third promise chain will print out error information, and will print out 'the promise chain is resolved'
// executing the fourth promise chain will cause a UnhandledPromiseRejectionWarning
