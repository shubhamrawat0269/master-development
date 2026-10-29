import net from "node:net";

process.stdin.on("data", (input) => {
  socket.write(input);
});

const socket = net.createConnection({ port: 4000, host: "192.168.1.11" });

socket.on("data", (data) => {
  console.log(data.toString());
});