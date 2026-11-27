import express from "express";

const app = express();

app.get("/", [
  (req, res, next) => {
    console.log("This is Middleware 1");
    res.write("This is Middleware 1\n");
    next("Error Alert");
  },
  (err, req, res, next) => {
    console.log("This is Error Middleware 1");
    console.log(err);
    res.end("This is Error Middleware 1\n");
  },
  (req, res, next) => {
    console.log("This is Middleware 3");
    res.write("This is Middleware 3\n");
    next();
  },
  (req, res, next) => {
    console.log("This is Middleware 2");
    res.end("This is Middleware 2\n");
  },
]);

app.listen(8082, () => {
  console.log("Server is running on port 8082");
});
