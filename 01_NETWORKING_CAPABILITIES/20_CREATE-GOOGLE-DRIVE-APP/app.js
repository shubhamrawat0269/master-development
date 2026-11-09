import { createReadStream } from "fs";
import { createServer } from "http";
import { routes } from "./routes.js";

const server = createServer((req, res) => {
  const pathName = routes[req.url];
  if (!pathName) {
    res.end("404 Not Found");
    return;
  }
  try {
    const readStream = createReadStream(`./storage/${pathName}`);
    readStream.pipe(res);
  } catch (error) {
    console.error(error);
  }
});

server.listen(4000, () => {
  console.log("Server listen to port 4000");
});
