import { createReadStream } from "node:fs";
import net from "node:net";

const server = net.createServer((socket) => {
  socket.write("http/1.1\n\n");

  // const readStream = createReadStream('num.txt');
  // const readStream = createReadStream('numbers.txt');
  // const readStream = createReadStream("river.webp");
  const readStream = createReadStream("handle-multiple-clients.mp4");
  readStream.pipe(socket);
});

server.listen(4000, () => {
  console.log("Server listen to port 4000");
});
