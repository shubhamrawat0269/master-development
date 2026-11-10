import { open, readdir, readFile } from "fs/promises";
import { createServer } from "http";

const server = createServer(async (req, res) => {
  async function renderDirectory(dirPath, linkPrefix = "./") {
    const directoryContent = await readdir(dirPath);
    const dynamicContent = directoryContent
      .map((content) => `<a href="${linkPrefix}${content}">${content}</a><br>`)
      .join("");

    const htmlContent = await readFile("./compose/index.html", "utf-8");
    return htmlContent.replace("${dynamicContent}", dynamicContent);
  }

  if (req.url === "/" || req.url === "/index.html") {
    const htmlDynamicContent = await renderDirectory("./compose");
    res.end(htmlDynamicContent);
  } else {
    try {
      const fileHandle = await open(`./compose${decodeURIComponent(req.url)}`);
      const stats = await fileHandle.stat();

      if (stats.isDirectory()) {
        const htmlDynamicContent = await renderDirectory(
          "./compose/images",
          "./images/",
        );
        res.end(htmlDynamicContent);
      } else if (stats.isFile()) {
        const readStream = fileHandle.createReadStream();
        readStream.pipe(res);
      } else {
        fileHandle.close();
        res.end("404! Page Not Found.");
      }
    } catch (error) {
      console.log(`Error : ${error.message}`);
      res.end("404 ! Page Not Found.");
    }
  }
});

server.listen(4000, () => {
  console.log("Server listen to port 4000");
});
