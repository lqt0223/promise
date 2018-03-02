# A step by step implementation practice of Promise

This repository shows implementation of the Promise class in JavaScript.

As Promise is a rather complex mechanism, this repository displays the full implementation gradually by providing each of the following phases in the implementation. Each phases are marked with a git tag. The phases are:

1. **basic**: a promise is an object that receives a function as parameter. When created, the function will be fired immediately

2. **job scheduling**: a promise is 'Thenable' and can call 'Promise.prototype.then' to schedule deferred jobs. When the promise is resolved, the callback in 'then' body will be called and the resolved value will be retrieved

3. **chaining**: a 'then' body will return a new Promise, which is also 'Thenable'. Once the first promise is fired, the promise chain will do the resolution towards its end automatically

4. **status control**: a promise has a initial state of 'pending', and will shift either to 'resolved' or 'rejected'

5. **error handling**: Promise.prototype.then' with error handler & Promise.prototype.catch' are ways to handle errors

6. **error propagation**: a rejected reason will be propagated to the nearest error handler or catch body. Jobs between the rejection and the nearest error handler would not be executed. After the error handling, the promise chain resumes execution

7. **auto-resolution of promise in then / catch body**: a promise returned from the callback in either a then or catch body will be automatically resolved or rejected, and the resolved value or rejected reason will appear in the next chained promise body

8. **exception capture**:  besides explicit rejection, a promise can capture a thrown error or exception in its body

9. **static methods**:  "Promise.resolve", "Promise.reject", "Promise.all" & "Promise.reject"

10. **re-thenablilty**: by calling 'Promise.prototype.then' on a promise multiple times, concurrent async jobs are scheduled
