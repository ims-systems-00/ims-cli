require("dotenv").config();
const path = require("path");
const { colors } = require("../../colors");
const { createFolder, createFile } = require("./services");
const fs = require("fs");
const {
  loadAvailableContentsOfThisFolderFromTheServer,
} = require("./nodeLister");
const fsPromises = fs.promises;

// process a single node
async function processNode(directory, parentNode = null, indent = "") {
  try {
    const items = await fsPromises.readdir(directory);
    const directories = [];
    const files = [];
    // split the fils and folders
    await Promise.all(
      items.map(async (item) => {
        try {
          const itemPath = path.join(directory, item);
          const stats = await fsPromises.stat(itemPath);
          if (stats.isDirectory()) {
            directories.push(item);
          }
          if (stats.isFile()) {
            files.push(item);
          }
        } catch (err) {
          console.error(err.message);
          console.log(err);
        }
      })
    );
    // sort out the files and folders by name
    directories.sort();
    files.sort();
    // fetch exisitng items from the server for this directory
    const nodes = await loadAvailableContentsOfThisFolderFromTheServer(
      parentNode
    );
    // filter exiting directories and files
    const existingDirectories = nodes
      .filter((node) => node.type === "folder")
      .map((node) => ({ name: node.name, _id: node._id }));
    const existingFiles = nodes
      .filter((node) => node.type === "document")
      .map((node) => ({ name: node.name, _id: node._id }));
    // merge the files and folders
    let mergedItems = [...directories, ...files];
    mergedItems = mergedItems.slice(0, 100);
    // start processing the node
    for (let index = 0; index < mergedItems.length; index++) {
      let item = mergedItems[index];
      const itemPath = path.join(directory, item);
      const stats = await fsPromises.stat(itemPath);
      const isLastItem = index === items.length - 1;
      const indentedName = indent + (isLastItem ? "└─ " : "├─ ") + item;
      if (stats.isDirectory()) {
        console.log(colors.cyan, indentedName, colors.reset);
        const isExistingDirectory = existingDirectories.find(
          (node) => node.name === item
        );
        const newIndent = indent + (isLastItem ? "   " : "│  ");
        if (!isExistingDirectory) {
          const createResponse = await createFolder({
            name: item,
            parentNode,
          });
          const createdFolderNode = createResponse.node;
          if (createdFolderNode?._id) {
            console.log(
              colors.green,
              indent + "   " + "success" + "(✔)",
              colors.reset
            );
            await processNode(itemPath, createdFolderNode?._id, newIndent);
          } else {
            console.log(
              colors.red,
              indent + "   " + "failed" + "(✖)",
              colors.reset
            );
          }
        } else {
          console.log(
            colors.yellow,
            indent + "   " + "create-skipped" + "(-)",
            colors.reset
          );
          await processNode(itemPath, isExistingDirectory?._id, newIndent);
        }
      }
      if (stats.isFile()) {
        console.log(colors.bright, indentedName, colors.reset);
        const isExistingFile = existingFiles.find((node) => node.name === item);
        if (!isExistingFile) {
          const createResponse = await createFile({
            fileName: item,
            filePath: itemPath,
            parentNode,
          });
          const createdDocumentNode = createResponse.nodes[0];
          if (createdDocumentNode?._id) {
            console.log(
              colors.green,
              indent + "   " + "success" + "(✔)",
              colors.reset
            );
          } else {
            console.log(
              colors.red,
              indent + "   " + "failed" + "(✖)",
              colors.reset
            );
          }
        } else {
          console.log(
            colors.yellow,
            indent + "   " + "create-skipped" + "(-)",
            colors.reset
          );
        }
      }
    }
  } catch (err) {
    console.error(err.message);
    console.log(err);
  }
}
module.exports = {
  processNode,
};
