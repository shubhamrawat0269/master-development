import mime from "mime-types";
import { open } from "node:fs/promises";
import { createServer } from "node:http";
import { renderDirectory } from "./helpers/utils.js";
import { createWriteStream } from "node:fs";

const server = createServer(async (req, res) => {
  console.log(req.method);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");


  if (req.method === "GET") {
    if (req.url == "/") {
      const dynamicContent = await renderDirectory("./compose");
      res.setHeader("Content-Type", "application/json");
      return res.end(dynamicContent);
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
  } else if (req.method === "POST") {
    req.on("data", (chunk) => {
      const writeStream = createWriteStream("new-file.txt");
      writeStream.write(chunk.toString());
    });

    req.on("end", () => {
      res.end("File Uploaded Successfully");
    });
  }
});

server.listen(4000, () => {
  console.log("Server listen to port 4000");
});
