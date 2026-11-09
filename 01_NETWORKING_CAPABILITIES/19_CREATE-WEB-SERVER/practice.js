import { open } from "node:fs/promises";
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
};

const server = createServer(async (req, res) => {
  const route = routes[req.url];

  if (!route) {
    res.writeHead(404, {
      "Content-Type": "text/plain",
    });
    res.end("404 - Page Not Found");
    return;
  }

  let fileHandle;

  try {
    fileHandle = await open(route.file, "r");
    res.writeHead(200, {
      "Content-Type": route.type,
    });

    await pipeline(fileHandle.createReadStream(), res);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await fileHandle?.close().catch(console.error);
  }
});

server.listen(PORT, () => {
  console.log(`Server listen to port ${PORT}`);
});
