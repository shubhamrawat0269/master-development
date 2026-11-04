import net from "node:net";
import { open } from "node:fs/promises";

const server = net.createServer(async (socket) => {
  let readStream;

  try {
    socket.on("error", (error) => {
      console.log("Socket error:", error.message);
    });

    const fileHandle = await open("response-headers.mp4");

    const { size } = fileHandle.stat();
    readStream = fileHandle.createReadStream();

    socket.write("http/1.1 200 Ok\n");
    socket.write("Content-Type: video/mp4;\n");
    socket.write("Content-Disposition: attachment; filename=download.mp4\n");
    socket.write(`Content-Length: ${size}\n`);
    socket.write(`Connection: close`);
    socket.write(`\n\n`);

    readStream.pipe(socket);
  } catch (error) {
    if (!socket.destroyed) {
      console.log("Streaming error:", error.message);
      socket.destroy();
    }
  }
});

server.listen(4000, () => {
  console.log("Server listen to port 4000");
});
