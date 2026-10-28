import dgram from "node:dgram"; // UDP module
import { writeFile } from "node:fs/promises";
const socket = dgram.createSocket("udp4");

socket.on("message", (decryptMsg, deviceDetails) => {
  const message = decryptMsg.toString();
  writeFile("file2.txt", message);

  socket.close();
});

socket.bind({ port: 4000 }, () => {
  const { port } = socket.address();
  console.log(`Server listen on port : ${port}`);
});
