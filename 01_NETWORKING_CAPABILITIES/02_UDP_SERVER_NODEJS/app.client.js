import dgram from "dgram";
import { readFile } from "fs/promises";

const socket = dgram.createSocket("udp4");
const content = await readFile("numbers.txt", "utf-8");

socket.send(content, 4000, "192.168.1.11", () => {
  console.log(`Client Message Send on Port ${"4000"}`);
});
