const fs = require('fs');

const {
  getAbsolutePath,
  getFilePaths
} = require('./utils/paths');
const licenceManager = require('./licence-manager');

const addLicence = async (argv) => {
  const [_, ...fileList] = argv._;
  let { config: configPath, template: templatePath } = argv;
  configPath = getAbsolutePath(configPath);
  templatePath = getAbsolutePath(templatePath);

  const config = require(configPath);
  const template = fs.readFileSync(templatePath, 'utf-8');
  const filePaths = await getFilePaths(fileList);

  filePaths.forEach((filePath) => {
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
