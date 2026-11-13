import mime from "mime-types";
import { open } from "node:fs/promises";
import { createServer } from "node:http";
import { renderDirectory } from "./helpers/utils.js";

const server = createServer(async (req, res) => {
  if (req.url == "/") {
    const dynamicHTMLContent = await renderDirectory("./compose");
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.end(dynamicHTMLContent);
  } else {
    try {
      const [url, queryParams = ""] = req.url.split("?");
      const queryList = {};
      queryParams.split("&").forEach((params) => {
        const [key, value] = params.split("=");
        queryList[key] = value;
      });

      const fileHandle = await open(`./compose${decodeURIComponent(url)}`);
      const stats = await fileHandle.stat();

      res.setHeader("Content-Length", stats.size);
      res.setHeader("Content-Type", mime.contentType(url.slice(1)));

      if (queryList["action"] == "download") {
        res.setHeader(
          "Content-Disposition",
          `attachment;filename=${url.slice(1)}`,
        );
      }

      if (stats.isDirectory()) {
        const dynamicHTMLContent = await renderDirectory(
          `./compose${decodeURIComponent(url)}`,
          `.${decodeURIComponent(url)}/`,
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
