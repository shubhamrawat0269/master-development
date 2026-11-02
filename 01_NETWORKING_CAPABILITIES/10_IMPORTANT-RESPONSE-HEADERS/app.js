import { open } from "node:fs/promises";
import net from "node:net";

const server = net.createServer(async (socket) => {
//   const fileHandle = await open("num.txt");
  const fileHandle = await open("numbers.txt");

  const readStream = fileHandle.createReadStream();
  const { size } = await fileHandle.stat();
  socket.write("http/1.1 200 Okay\n");
  //   socket.write("Content-Type: video/mp4\n");
  //   socket.write("Content-Type: image/jpg\n");
  //   socket.write("Content-Type: application/json\n");
  socket.write("Content-Type: text/txt; charset=utf-8\n");
  socket.write(`Content-Length: ${size}\n\n`);
  readStream.pipe(socket);
});

server.listen(4000, () => {
  console.log("Server listen to port: 4000");
});
