# A step by step implementation practice of Promise

This repository shows implementation of the Promise class in JavaScript.

As Promise is a rather complex mechanism, this repository displays the full implementation gradually by providing each of the following phases in the implementation. Each phases are marked with a git tag. The phases are:

1. **basic**: a promise is an object that receives a function as parameter. When created, the function will be fired immediately

2. **job scheduling**: a promise is 'Thenable' and can call 'Promise.prototype.then' to schedule deferred jobs. When the promise is resolved, the callback in 'then' body will be called and the resolved value will be retrieved

3. **chaining**: a 'then' body will return a new Promise, which is also 'Thenable'. Once the first promise is fired, the promise chain will do the resolution towards its end automatically

4. **status control**: a promise has a initial state of 'pending', and will shift either to 'resolved' or 'rejected'

5. **error handling**: Promise.prototype.then' with error handler & Promise.prototype.catch' are ways to handle errors
