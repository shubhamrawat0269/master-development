import { createWriteStream } from "node:fs";
import net from "node:net";

const server = net.createServer((socket) => {
  socket.write("http/1.1 200 Ok\n\n");
  const writeStream = createWriteStream("content.txt");
  socket.on("data", (chunk) => {
    writeStream.write(chunk);
    if (/WebKitFormBoundary.+--/.test(chunk.toString())) {
      socket.end("Server recieved data successfully");
    }
  });
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
