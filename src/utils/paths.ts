import path from 'path';
import globby from 'globby';

const getAbsolutePath = (filePath: string) => {
  if (!path.isAbsolute(filePath)) {
    filePath = path.resolve(process.cwd(), filePath);
  }

  return filePath;
};

const getFilePathsFromGlob = async (pattern: string | string[]) => {
  return await globby(pattern, { absolute: true });
};

const getFilePaths = async (patterns: string[]) => {
  const filePathsPromises = getFilePathsFromGlob(patterns);
  const filePaths = await Promise.resolve(filePathsPromises);
  console.log('filePaths', filePaths);
  return filePaths.flat(Infinity)
}

export {
  getAbsolutePath,
  getFilePaths
};
