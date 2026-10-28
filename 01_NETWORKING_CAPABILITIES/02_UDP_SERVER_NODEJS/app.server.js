import dgram from "node:dgram";
import { writeFile } from "node:fs/promises";

const socket = dgram.createSocket("udp4");

socket.on("message", async (message) => {
  await writeFile("transfer-number.txt", message.toString());
  socket.close();
});

socket.bind({ port: 4000 }, () => {
  const { port } = socket.address();
  console.log(`Server listen to port ${port}`);
});
