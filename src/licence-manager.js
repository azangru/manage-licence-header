const addLicence = (fileContent, licenceText, config) => {
  if (!shouldAddLicence(fileContent, licenceText)) {
    return fileContent;
  }
  const licenceComment = prepareLicenceComment(licenceText, config);
  return `${licenceComment}\n\n${fileContent}`;
};

const removeLicence = (fileContent, licenceText) => {
  const licenceComment = prepareLicenceComment(licenceText);
  const fileWithoutLicence = fileContent.replace(licenceComment, '');
  return fileWithoutLicence.replace(/^\s+/, ''); // remove leading white space
};

const replaceLicence = (fileContent, oldLicence, newLicence) => {
  const cleanFileContent = removeLicence(fileContent, oldLicence);
  return addLicence(cleanFileContent, newLicence);
};

const prepareLicenceComment = (licenceText, config) => {
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

  for (line of lines) {
    line = `${prependEachLine}${line}${appendEachLine}`;
    result.push(line);
  }

  if (append) {
    result.push(append);
  }

  return result.join('\n');
};

const shouldAddLicence = (fileContent, licenceText) => {
  return !fileContent.includes(licenceText.trim());
};

module.exports = {
  addLicence,
  removeLicence,
  replaceLicence
};
