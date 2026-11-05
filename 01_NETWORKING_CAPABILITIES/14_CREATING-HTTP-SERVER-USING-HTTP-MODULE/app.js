import http from "node:http";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Content-Length", Buffer.byteLength("Hello from server"));

  res.write("Hello from server");
});

// server.on("request", (req, res) => {
//   res.setHeader("Content-Type", "text/plain");
//   res.setHeader("Content-Length", Buffer.byteLength("Hello from server"));
//   res.write("Hello from server");
// });

server.listen(4000, () => {
  console.log("Server listen to port 4000");
});
