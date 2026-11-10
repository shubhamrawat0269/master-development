import { open, readdir, readFile } from "fs/promises";
import { createServer } from "http";

const server = createServer(async (req, res) => {
  if (req.url === "/") {
    const directoryContent = await readdir("./compose");
    let dynamicContent = "";
    directoryContent.forEach((content) => {
      dynamicContent += `<a href='./${content}'>${content}</a><br>`;
    });

    const htmlContent = await readFile("./compose/index.html", "utf-8");
    res.end(htmlContent.replace("${dynamicContent}", dynamicContent));
  } else {
    try {
      const fileHandle = await open(`./compose${decodeURIComponent(req.url)}`);
      const stats = await fileHandle.stat();

      if (stats.isDirectory()) {
        const directoryContent = await readdir("./compose/images");
        let dynamicContent = "";
        directoryContent.forEach((content) => {
          dynamicContent += `<a href='./images/${content}'>${content}</a><br>`;
        });

        const htmlContent = await readFile("./compose/index.html", "utf-8");
        res.end(htmlContent.replace("${dynamicContent}", dynamicContent));
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
