import net from "node:net";

const server = net.createServer((socket) => {
  socket.write("http/1.1 200 Ok\n");
  socket.write("Access-Control-Allow-Origin: *\n");
  socket.write("Content-Type: application/json\n");
  socket.write("\n\n");
  socket.write(`{"username": "shubham rawat"}`);
});

server.listen(4000, () => {
  console.log("server listen to port: 4000");
});
