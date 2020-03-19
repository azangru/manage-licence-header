#!/usr/bin/env node

import yargs from 'yargs';
import path from 'path';

import {
  addLicence,
  removeLicence,
  replaceLicence
} from './runner';
import {
  ReplaceArgv
} from './prepare-payload';

const normalOptions = {
  config: {
    default: path.resolve(__dirname, 'config.js'),
    describe: 'Rules for comment formatting'
  },
  template: {
    default: path.resolve(__dirname, '../text/licence-header.txt'),
    describe: 'Text of the header'
  }
};

const replaceOptions = {
  config: {
    default: path.resolve(__dirname, 'config.js'),
    describe: 'Rules for comment formatting'
  },
  oldTemplate: {
    demandOption: true,
    describe: 'Text of the old header'
  },
  newTemplate: {
    demandOption: true,
    describe: 'Text of the new header'
  }
};

yargs
  .usage('Add licence header to your files')
  .command('add', 'Add licence header', normalOptions, (argv) => {
    addLicence(argv);
  })
  .command('remove', 'Remove licence header', normalOptions, (argv) => {
    removeLicence(argv);
  })
  .command('replace', 'Replace old licence header with new one', replaceOptions, (argv) => {
    replaceLicence(argv as ReplaceArgv);
  })
  .argv;
