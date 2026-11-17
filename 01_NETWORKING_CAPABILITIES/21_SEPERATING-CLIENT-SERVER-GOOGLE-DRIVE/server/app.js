import mime from "mime-types";
import { open, rename, rm } from "node:fs/promises";
import { createServer } from "node:http";
import { renderDirectory } from "./helpers/utils.js";
import { createWriteStream } from "node:fs";

const server = createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");

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
  } else if (req.method === "OPTIONS") {
    res.end("OK");
  } else if (req.method === "POST") {
    const writeStream = createWriteStream(`./compose/${req.headers.filename}`);
    req.pipe(writeStream);

    req.on("end", () => {
      res.end("File Uploaded Successfully");
    });
  } else if (req.method === "DELETE") {
    req.on("data", async (filename) => {
      await rm(`./compose/${filename}`);
    });

    req.on("end", () => {
      res.end("File deleted successfully");
    });
  } else if (req.method === "PATCH") {
    req.on("data", async (data) => {
      const { oldFileName, newFileName } = JSON.parse(data);
      await rename(`./compose/${oldFileName}`, `./compose/${newFileName}`);
      res.end("File Edited Successfully");
    });
  }
});

server.listen(4000, () => {
  console.log("Server listen to port 4000");
});
