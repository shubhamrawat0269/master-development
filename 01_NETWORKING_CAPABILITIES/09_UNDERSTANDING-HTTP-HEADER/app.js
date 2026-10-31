import net from "node:net";

const server = net.createServer((socket) => {
  socket.end(
    "http/1.0 200 Okay\nAccess-Control-Allow-Origin:*\nAccess-Control-Expose-Headers:*\n\nHello I am server",
  );
});

server.listen(4000, () => {
  console.log("Server listen to port 4000");
});
