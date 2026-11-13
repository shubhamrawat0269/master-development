import { readdir } from "node:fs/promises";

export async function renderDirectory(dirPath, linkPrefix = "./") {
  const dynamicContent = await readdir(dirPath);
  return JSON.stringify(dynamicContent);
}
