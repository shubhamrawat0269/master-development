import { open } from "node:fs/promises";
import { createServer } from "node:http";
import { renderDirectory } from "./helpers/utils.js";

const server = createServer(async (req, res) => {
  if (req.url == "/") {
    const dynamicHTMLContent = await renderDirectory("./compose");
    return res.end(dynamicHTMLContent);
  } else {
    try {
      const fileHandle = await open(`./compose${decodeURIComponent(req.url)}`);
      const stats = await fileHandle.stat();

      if (stats.isDirectory()) {
        const dynamicHTMLContent = await renderDirectory(
          `./compose${decodeURIComponent(req.url)}`,
          `.${decodeURIComponent(req.url)}/`,
        );
        return res.end(dynamicHTMLContent);
      } else if (stats.isFile()) {
        const readStream = fileHandle.createReadStream();
        readStream.pipe(res);
      } else {
        fileHandle.close();
        res.end("No File Found");
      }
    } catch (error) {
      console.log("Error : ", error.message);
      res.end("Error Occured");
    }
  }
});

server.listen(4000, () => {
  console.log("Server listen to port 4000");
});
