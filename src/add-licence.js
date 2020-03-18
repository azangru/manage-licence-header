const fs = require('fs');
const path = require('path');

const licenceManager = require('./licence-manager');

const licenceText = fs.readFileSync(path.resolve(__dirname, 'licence-header.txt'), 'utf-8');

const addLicence = (argv) => {
  const [_, ...fileList] = argv._;
  let { config: configPath, template: templatePath } = argv;
  configPath = path.isAbsolute(configPath)
    ? configPath
    : path.resolve(process.cwd(), configPath);
  templatePath = path.isAbsolute(templatePath)
    ? templatePath
    : path.resolve(process.cwd(), templatePath);

  const config = require(configPath);
  const template = fs.readFileSync(templatePath, 'utf-8');

  fileList.forEach((fileName) => {
    const filePath = path.isAbsolute(fileName)
      ? filePath
      : path.resolve(process.cwd(), fileName);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const fileExtension = filePath.split('.').pop();
    const withLicence = licenceManager.addLicence(fileContent, template, config[fileExtension]);
    console.log('withLicence', withLicence);
    // fs.writeFileSync(filePath, withLicence);
  });
};

// const filePaths = process.argv.slice(2);
// filePaths.forEach(addLicence);

module.exports = addLicence;
