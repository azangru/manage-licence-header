import fs from 'fs';

import {
  getAbsolutePath,
  getFilePaths
} from './utils/paths';
import * as licenceManager from './licence-manager';

export type Argv = {
  _: string[],
  config: string,
  template: string,
}

const addLicence = async (argv: Argv) => {
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

export default addLicence;
