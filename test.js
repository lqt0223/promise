var Promise = require('.')

// test code
var p = new Promise((resolve) => {
  console.log('first promise')
  resolve(2)
})

p.then((value) => {
  console.log('resolved value:', value)
})

// expected result: first promise -> resolved value: 2
