import fs from 'fs';

import {
  getAbsolutePath,
  getFilePaths
} from './utils/paths';

export type RegularArgv = {
  _: string[];
  config: string;
  template: string;
};
export type ReplaceArgv = {
  _: string[];
  config: string;
  oldTemplate: string;
  newTemplate: string;
};

const prepareRegularPayload = async (argv: RegularArgv) => {
  const [_, ...fileList] = argv._;
  let { config: configPath, template: templatePath } = argv;
  configPath = getAbsolutePath(configPath);
  templatePath = getAbsolutePath(templatePath);

  const config = await import(configPath);
  const template = fs.readFileSync(templatePath, 'utf-8');
  const filePaths = await getFilePaths(fileList);

  return {
    config,
    template,
    filePaths
  };
};

export const preparePayloadForReplace = async (argv: ReplaceArgv) => {
  const [_, ...fileList] = argv._;
  let {
    config: configPath,
    oldTemplate: oldTemplatePath,
    newTemplate: newTemplatePath
  } = argv;
  configPath = getAbsolutePath(configPath);
  oldTemplatePath = getAbsolutePath(oldTemplatePath);
  newTemplatePath = getAbsolutePath(newTemplatePath);

  const config = require(configPath);
  const oldTemplate = fs.readFileSync(oldTemplatePath, 'utf-8');
  const newTemplate = fs.readFileSync(newTemplatePath, 'utf-8');
  const filePaths = await getFilePaths(fileList);

  return {
    config,
    oldTemplate,
    newTemplate,
    filePaths
  };
};

export const preparePayloadForAdd = prepareRegularPayload;
export const preparePayloadForRemove = prepareRegularPayload;

