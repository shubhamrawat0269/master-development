import net from "node:net";

process.stdin.on("data", (input) => {
  const message = input.toString();
  const number = parseInt(message.split(" ")[0]);

  console.log({ message, number });

  clientList.forEach((socket, id) => {
    if (id !== number) socket.write(message);
  });
});

const clientList = [];

const server = net.createServer((socket) => {
  clientList.push(socket);
  socket.on("data", (chunk) => {
    clientList.forEach((socket) => {
      socket.write(chunk);
    });
  });
});

server.listen(4000, () => {
  console.log(`Server listen on port 4000`);
});
