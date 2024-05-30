const fs = require('fs-extra');
async function copyFolder(source, destination) {
  try {
    await fs.copy(source, destination);
    console.log(`Folder copied from ${source} to ${destination}`);
  } catch (error) {
    console.error(`Error copying folder: ${error}`);
  }
}

// Replace sourcePath and destinationPath with your actual paths
const sourcePath = 'apps/api/typechain-types';
const destinationPath = 'apps/ui/src/typechain-types';

copyFolder(sourcePath, destinationPath);
