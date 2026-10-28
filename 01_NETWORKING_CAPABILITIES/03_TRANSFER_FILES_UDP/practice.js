// client code 

import dgram from "node:dgram";
const socket = dgram.createSocket("udp4");
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
// import { readFile } from "node:fs/promises";

// const content = await readFile("file1.txt", "utf-8");
// const content = await readFile("random-text.txt", "utf-8");
const file = "random-text.txt";
const totalBytes = (await stat(file)).size;
let sentBytes = 0;

const readStream = createReadStream(file, { highWaterMark: 1000 });

readStream.on("data", (chunk) => {
  readStream.pause();

  socket.send(chunk, 4000, "192.168.1.11", () => {
    sentBytes += chunk.length;
    const percent =
      totalBytes === 0 ? 100 : Math.floor((sentBytes / totalBytes) * 100);

    process.stdout.write(`\rTransfer progress: ${percent}%`);
    readStream.resume();
  });
});

readStream.on("end", () => {
  process.stdout.write(`\n`);
  socket.close();
});



// server code 

import dgram from "node:dgram";
const socket = dgram.createSocket("udp4");
import { createWriteStream } from "node:fs";
// import { writeFile } from "node:fs/promises";
const writeStream = createWriteStream("new-file.txt");

socket.on("message", async (decryptMsg) => {
  const encryptMsg = decryptMsg.toString();
  //   console.log(encryptMsg);
  //   await writeFile("file2.txt", encryptMsg);

  writeStream.write(encryptMsg);
  //   socket.close();
});

socket.bind({ port: 4000 }, () => {
  const { port } = socket.address();
  console.log(`Server listen to ${port}`);
});
