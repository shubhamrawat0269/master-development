import { readdir, readFile } from "node:fs/promises";

export async function renderDirectory(dirPath, linkPrefix = "./") {
  const dynamicContent = await readdir(dirPath);
  // const dynamicContent = directoryContent
  //   .map(
  //     (content) => `
  //        <div class='container'>
  //         <p>${content}</p>
  //         <a href="${linkPrefix}${content}?action=preview">Preview</a>
  //         <a href="${linkPrefix}${content}?action=download">Download</a>
  //        </div>`,
  //   )
  //   .join("");

  // const htmlContent = await readFile("./index.html", "utf-8");
  // return htmlContent.replace("${listContent}", dynamicContent);
  return JSON.stringify(dynamicContent);
}
