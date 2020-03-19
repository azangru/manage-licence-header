import fs from 'fs';

import {
  preparePayloadForAdd,
  preparePayloadForRemove,
  preparePayloadForReplace,
  RegularArgv,
  ReplaceArgv
} from './prepare-payload';
import * as licenceManager from './licence-manager';

export type Argv = {
  _: string[],
  config: string,
  template: string,
}

export const addLicence = async (argv: RegularArgv) => {
  const {
    config,
    template,
    filePaths
  } = await preparePayloadForAdd(argv);

  filePaths.forEach((filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const fileExtension = filePath.split('.').pop();
    const configForExtension = config[fileExtension] || {};
    const withLicence = licenceManager.addLicence(fileContent, template, configForExtension);
    fs.writeFileSync(filePath, withLicence);
  });
};

export const removeLicence = async (argv: RegularArgv) => {
  const {
    config,
    template,
    filePaths
  } = await preparePayloadForRemove(argv);

  filePaths.forEach((filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const fileExtension = filePath.split('.').pop();
    const configForExtension = config[fileExtension] || {};
    const withLicence = licenceManager.removeLicence(fileContent, template, configForExtension);
    fs.writeFileSync(filePath, withLicence);
  });
};

export const replaceLicence = async (argv: ReplaceArgv) => {
  const {
    config,
    oldTemplate,
    newTemplate,
    filePaths
  } = await preparePayloadForReplace(argv);

  filePaths.forEach((filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const fileExtension = filePath.split('.').pop();
    const configForExtension = config[fileExtension] || {};
    const withLicence = licenceManager.replaceLicence(
      fileContent,
      oldTemplate,
      newTemplate,
      configForExtension
    );
    fs.writeFileSync(filePath, withLicence);
  });
};
