import net from "node:net";

const socket = net.createConnection({ port: 4000, host: "192.168.1.11" });

socket.on("data", (chunk) => {
  const message = chunk.toString();
  console.log(message);
});

socket.on("error", () => {
  console.log("Server lost");
});

setTimeout(() => {
  socket.write("Hello From Client");
}, 2000);
