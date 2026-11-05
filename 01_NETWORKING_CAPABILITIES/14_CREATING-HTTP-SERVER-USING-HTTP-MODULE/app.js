import http from "node:http";

const server = http.createServer((req, res) => {
  const message = "Hello from HTTP server";
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Content-Length", Buffer.byteLength(message));

  req.on("data", (chunk) => {
    console.log(chunk.toString());
  });

  res.write(message);
});

// const server = http.createServer();

// server.on("connection", (socket) => {
//   socket.end("http/1.1 200 Ok\n\nHii from http server");
// });

// server.on("request", (req, res) => {
//   res.write("hii shubham");
//   res.end();
// });

// server.on("request", (req, res) => {
//   res.setHeader("Content-Type", "text/plain");
//   res.setHeader("Content-Length", Buffer.byteLength("Hello from server"));
//   res.write("Hello from server");
// });

server.listen(4000, "0.0.0.0", () => {
  console.log("Server listen to port 4000");
});
