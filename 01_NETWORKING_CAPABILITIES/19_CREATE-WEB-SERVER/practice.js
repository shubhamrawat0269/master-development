import { createReadStream } from "node:fs";
import { createServer } from "node:http";
import { pipeline } from "node:stream/promises";

const PORT = 4000;

const routes = {
  "/": {
    file: "index.html",
    type: "text/html",
  },
  "/style.css": {
    file: "style.css",
    type: "text/css",
  },
  "/script.js": {
    file: "script.js",
    type: "text/javascript",
  },
  "/about.html": {
    file: "about.html",
    type: "text/html",
  },
};

const server = createServer(async (req, res) => {
  const route = routes[req.url];

  if (!route) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Page Not Found");
    return;
  }

  try {
    const readStream = createReadStream(route.file);
    // readStream.pipe(res);
    await pipeline(readStream, res);
  } catch (error) {
    console.error("Error: ", error);
  }
});

server.listen(PORT, () => {
  console.log(`Server listen to port ${PORT}`);
});
