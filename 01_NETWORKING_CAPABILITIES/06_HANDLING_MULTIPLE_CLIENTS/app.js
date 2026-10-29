import net from "node:net";

process.stdin.on("data", (input) => {
  // socket.write(input);
  clientList.forEach((socket) => socket.write(input));
});

let clientList = [];

const server = net.createServer((socket) => {
  clientList.push(socket);
  socket.on("data", (data) => {
    console.log(data.toString());
  });
});

server.listen(4000, () => {
  console.log("Server listen to port 4000");
});
