import { open, readdir } from "fs/promises";
import { createServer } from "http";

const server = createServer(async (req, res) => {
  if (req.url == "/") {
    const fileList = await readdir("./storage");
    let unorderedList = "";

    fileList.forEach((list) => {
      const str = `<a href='./${list}'>${list}</a><br>`;
      unorderedList += str;
    });

    res.end(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Creating Google Drive</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Creating Google Drive Application</h1>
    <div>
      ${unorderedList}
    </div>
  </body>
</html>`);
  } else {
    try {
      const fileHandle = await open(`./storage${decodeURIComponent(req.url)}`);
      const readStream = fileHandle.createReadStream();
      readStream.pipe(res);
    } catch (error) {
      console.error(`Error : ${error}`);
      res.end("Not Found !!!");
    }
  }
});

server.listen(4000, () => {
  console.log("Server listen to port 4000");
});
