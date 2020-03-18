import { Config } from './config';

const addLicence = (fileContent: string, licenceText: string, config: Config) => {
  if (!shouldAddLicence(fileContent, licenceText)) {
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
    }
  } = config;
  const lines = licenceText.split('\n');
  const result = [];

  if (prepend) {
    result.push(prepend);
  }

  for (let line of lines) {
    line = `${prependEachLine}${line}${appendEachLine}`;
    result.push(line);
  }

  if (append) {
    result.push(append);
  }

  return result.join('\n');
};

const shouldAddLicence = (fileContent: string, licenceText: string) => {
  return !fileContent.includes(licenceText.trim());
};

export {
  addLicence,
  removeLicence,
  replaceLicence
};
