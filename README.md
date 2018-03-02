# A step by step implementation practice of Promise

This repository shows implementation of the Promise class in JavaScript.

As Promise is a rather complex mechanism, this repository displays the full implementation gradually by providing each of the following phases in the implementation. Each phases are marked with a git tag. The phases are:

1. **basic**: a promise is an object that receives a function as parameter. When created, the function will be fired immediately

2. **job scheduling**: a promise is 'Thenable' and can call 'Promise.prototype.then' to schedule deferred jobs. When the promise is resolved, the callback in 'then' body will be called and the resolved value will be retrieved
