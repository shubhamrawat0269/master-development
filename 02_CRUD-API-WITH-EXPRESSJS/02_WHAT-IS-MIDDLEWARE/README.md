# important notes

1. Middleware is a function.
2. Middleware is a mediator b/w incoming req and response.
3. How middlware works using next method.
4. Middleware runs in order.
5. Nodejs adds middleware to an array. If you add list of functions, it will run as usual.
6. It is of two types : request handler (either 3 or 2 params) & error handler params.
7. Syntax of Request handler & error handler middleware -
   i. (req, res, next) => {} || (req, res) => {}
   ii. (err, req, res, next) => {}
8. Error middleware run when we pass params to next('Hello Shubham') or next with truthy value, not falsy value.
Note : We use next with params to handle errors effectively using try-catch.