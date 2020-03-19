#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const path_1 = __importDefault(require("path"));
const runner_1 = require("./runner");
const normalOptions = {
    config: {
        default: path_1.default.resolve(__dirname, 'config.js'),
        describe: 'Rules for comment formatting'
    },
    template: {
        default: path_1.default.resolve(__dirname, '../text/licence-header.txt'),
        describe: 'Text of the header'
    }
};
const replaceOptions = {
    config: {
        default: path_1.default.resolve(__dirname, 'config.js'),
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
yargs_1.default
    .usage('Add licence header to your files')
    .command('add', 'Add licence header', normalOptions, (argv) => {
    runner_1.addLicence(argv);
})
    .command('remove', 'Remove licence header', normalOptions, (argv) => {
    runner_1.removeLicence(argv);
})
    .command('replace', 'Replace old licence header with new one', replaceOptions, (argv) => {
    runner_1.replaceLicence(argv);
})
    .argv;
