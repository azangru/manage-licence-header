import fs from 'fs';
import path from 'path';
import globby from 'globby';

const getAbsolutePath = (filePath: string) => {
  if (!path.isAbsolute(filePath)) {
    filePath = path.resolve(process.cwd(), filePath);
  }

  return filePath;
};

const getFilePathsFromGlob = async (pattern: string) => {
  return await globby(pattern, { absolute: true });
};

const getFilePaths = async (patterns: string[]) => {
  const filePathsPromises = patterns.reduce((result: Array<Promise<string[]>>, pattern): Array<Promise<string[]>> => {
    return result.concat(getFilePathsFromGlob(pattern));
  }, []);
  const filePaths = await Promise.all(filePathsPromises);
  return filePaths.flat(Infinity)
}

export {
  getAbsolutePath,
  getFilePaths
};
