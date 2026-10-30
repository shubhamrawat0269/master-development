import { createReadStream } from "node:fs";
import net from "node:net";

const socket = net.createConnection({ port: 4000, host: "192.168.1.11" });

socket.on("connect", () => {
  console.log("Connected to TCP Server");

  const readStream = createReadStream("handle-multiple-clients.mp4");
  readStream.pipe(socket);
});
