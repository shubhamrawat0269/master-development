import { createReadStream } from "node:fs";
import { createServer } from "node:http";

const server = createServer((req, res) => {
  // console.log(`${req.url}index.html`);
  if (req.url === "/") {
    const readStream = createReadStream("./index.html");
    readStream.pipe(res);
  } else {
    const readStream = createReadStream(`.${req.url}`);
    readStream.pipe(res);
  }
});

server.listen(4000, () => {
  console.log("Server listen on port 4000");
});
