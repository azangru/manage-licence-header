const fs = require('fs');
const path = require('path');
const globby = require('globby');

const getAbsolutePath = (filePath) => {
  if (!path.isAbsolute(filePath)) {
    filePath = path.resolve(process.cwd(), filePath);
  }

  return filePath;
};

const getFilePathsFromGlob = async (pattern) => {
  return await globby(pattern, { absolute: true });
};

const getFilePaths = async (patterns) => {
  const filePathsPromises = patterns.reduce((result, pattern) => {
    return result.concat(getFilePathsFromGlob(pattern));
  }, []);
  const filePaths = await Promise.all(filePathsPromises);
  return filePaths.flat(Infinity)
}

module.exports = {
  getAbsolutePath,
  getFilePaths
};
