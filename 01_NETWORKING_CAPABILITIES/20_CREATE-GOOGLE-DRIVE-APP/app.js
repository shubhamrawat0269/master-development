import { open, readdir } from "fs/promises";
import { createServer } from "http";

const server = createServer(async (req, res) => {
  if (req.url === "/") {
    const directoryContent = await readdir("./compose");
    let dynamicContent = "";
    directoryContent.forEach((content) => {
      dynamicContent += `<a href='./${content}'>${content}</a><br>`;
    });

    res.end(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Drive.</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>My Drive.</h1>
    ${dynamicContent}
  </body>
</html>
`);
  } else {
    try {
      const fileHandle = await open(`./compose${decodeURIComponent(req.url)}`);
      const readStream = fileHandle.createReadStream();

      readStream.pipe(res);
    } catch (error) {
      console.log(`Error : ${error.message}`);
      res.end("404 ! Page Not Found.");
    }
  }
});

server.listen(4000, () => {
  console.log("Server listen to port 4000");
});
