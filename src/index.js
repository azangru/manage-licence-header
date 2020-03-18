const yargs = require('yargs');
const path = require('path');

const addLicence = require('./add-licence');

const normalOptions = {
  config: {
    default: path.resolve(__dirname, 'config.js'),
    describe: 'Rules for comment formatting'
  },
  template: {
    default: path.resolve(__dirname, 'licence-header.txt'),
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

const argv = yargs
  .usage('Add licence header to your files')
  .command('add', 'Add licence header', normalOptions, (argv) => {
    addLicence(argv);
  })
  .command('remove', 'Remove licence header', normalOptions)
  .command('replace', 'Replace old licence header with new one', replaceOptions)
  .argv;
