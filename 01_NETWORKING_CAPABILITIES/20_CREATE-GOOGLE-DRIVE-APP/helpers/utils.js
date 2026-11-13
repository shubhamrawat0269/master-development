import { readdir, readFile } from "node:fs/promises";

export async function renderDirectory(dirPath, linkPrefix = "./") {
  const directoryContent = await readdir(dirPath);
  const dynamicContent = directoryContent
    .map(
      (content) => `
         <div class='container'>
          <p>${content}</p>
          <a href="${linkPrefix}${content}">Preview</a>
          <a href="${linkPrefix}${content}">Download</a>
         </div>`,
    )
    .join("");

  const htmlContent = await readFile("./index.html", "utf-8");
  return htmlContent.replace("${listContent}", dynamicContent);
}
