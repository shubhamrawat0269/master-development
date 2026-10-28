import dgram from "node:dgram"; // UDP module
import { readFile } from "node:fs/promises";

const socket = dgram.createSocket("udp4");

const content = await readFile("file1.txt", "utf-8");

socket.send(content, 4000, "192.168.1.11", () => {
  console.log("Message send to server");
});
