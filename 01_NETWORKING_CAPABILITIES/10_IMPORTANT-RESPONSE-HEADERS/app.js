import { open } from "node:fs/promises";
import net from "node:net";

const server = net.createServer(async (socket) => {
  // const fileHandle = await open("num.txt");
  const fileHandle = await open("resume.pdf");
  const readStream = fileHandle.createReadStream();
  const { size } = fileHandle.stat();

  socket.write("http/1.1 200 Okay\n");
  // socket.write("Content-Type: application/pdf\n");
  // socket.write("Content-Type: text/txt; charset=utf-8\n");
  socket.write("Content-Type: application/json; charset=utf-8\n");
  socket.write("Content-Type: video/mp4; charset=utf-8\n");
  socket.write("Content-Type: image/jpg; charset=utf-8\n");
  // socket.write("Content-Disposition: inline; filename=shubham.pdf\n");
  socket.write("Content-Disposition: attachment; filename=shubham.pdf\n");
  socket.write(`Content-Length: ${size}`);
  socket.write("\n\n");

  readStream.pipe(socket);
  // socket.end("Hello I am server");
});

server.listen(4000, () => {
  console.log("Server listen to port 4000");
});
