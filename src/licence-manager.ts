import { Config } from './config';

const addLicence = (fileContent: string, licenceText: string, config: Config) => {
  if (hasLicence(fileContent, licenceText)) {
    return fileContent;
  }
  const licenceComment = prepareLicenceComment(licenceText, config);
  return `${licenceComment}\n\n${fileContent}`;
};

const removeLicence = (fileContent: string, licenceText: string, config: Config) => {
  const licenceComment = prepareLicenceComment(licenceText, config);
  const fileWithoutLicence = fileContent.replace(licenceComment, '');
  return fileWithoutLicence.replace(/^\s+/, ''); // remove leading white space
};

const replaceLicence = (fileContent: string, oldLicence: string, newLicence: string, config: Config) => {
  const cleanFileContent = removeLicence(fileContent, oldLicence, config);
  return addLicence(cleanFileContent, newLicence, config);
};

const prepareLicenceComment = (licenceText: string, config: Config) => {
  licenceText = licenceText.trim();
  const {
    prepend,
    append,
    eachLine: {
      prepend: prependEachLine = '',
      append: appendEachLine = ''
    } = {}
  } = config;
  const lines = licenceText.split('\n');
  const result = [];

  if (prepend) {
    result.push(prepend);
  }

  for (let line of lines) {
    line = `${prependEachLine}${line}${appendEachLine}`.trim();
    result.push(line);
  }

  if (append) {
    result.push(append);
  }

  return result.join('\n');
};

const hasLicence = (fileContent: string, licenceText: string) => {
  const licenceTextLines = licenceText.split('\n');
  const fileContentLines = fileContent.split('\n');
  const firstLineIndex = fileContentLines.findIndex((line) => line.includes(licenceTextLines[0]));

  if (firstLineIndex === -1) {
    return false;
  }

  const hasLicence = licenceTextLines.every((licenceLine, index) => {
    const lineInFile = fileContentLines[index + firstLineIndex];
    return lineInFile.includes(licenceLine);
  });
  return hasLicence;
};

export {
  addLicence,
  removeLicence,
  replaceLicence
};
