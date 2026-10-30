import { createWriteStream } from "node:fs";
import net from "node:net";

const server = net.createServer((socket) => {
  console.log("Client connected:", socket.remoteAddress);

  const writeStream = createWriteStream("tcp-handle.mp4");
  socket.pipe(writeStream);
});

server.listen(4000, () => {
  console.log("Server listen on port 4000");
});
