import net from "node:net";

const server = net.createServer();

server.on("connection", (socket) => {
  socket.on("data", (chunk) => {
    const message = chunk.toString();
    console.log(message);
    socket.write("Message Recieved Successfully");
  });

  console.log("Client Connection Successfully");

  socket.on("error", () => {
    console.log("Client lost");
  });
});

server.listen(4000, () => {
  console.log("Server listen on port 4000");
});
