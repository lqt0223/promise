var Promise = require('.')

// test code
var p = new Promise((resolve) => {
  console.log('first promise')
  resolve(2)
})

p.then((value) => {
  console.log('resolved value:', value)
  return 3
}).then((value) => {
  console.log('another resolved value:', value)
})

// expected result: first promise -> resolved value: 2 -> another resolved value: 3
