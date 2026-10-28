import net from "node:net"; // TCP module

const server = net.createServer();

server.on("connection", (socket) => {
  socket.on("data", (chunk) => {
    const message = chunk.toString();
    console.log("Message Recieved: ", message);
  });

  console.log(socket.remoteAddress);
  console.log(socket.remoteFamily);
  console.log(socket.remotePort);

  socket.on("close", () => {
    console.log("Connection Closed");
  });
  console.log("Connection Eastablished");
});

server.listen(4000, "0.0.0.0", () => {
  console.log("Server is running on port 4000");
});
