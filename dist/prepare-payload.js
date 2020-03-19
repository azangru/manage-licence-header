"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const paths_1 = require("./utils/paths");
const prepareRegularPayload = async (argv) => {
    const [_, ...fileList] = argv._;
    let { config: configPath, template: templatePath } = argv;
    configPath = paths_1.getAbsolutePath(configPath);
    templatePath = paths_1.getAbsolutePath(templatePath);
    const config = require(configPath);
    const template = fs_1.default.readFileSync(templatePath, 'utf-8');
    const filePaths = await paths_1.getFilePaths(fileList);
    return {
        config,
        template,
        filePaths
    };
};
exports.preparePayloadForReplace = async (argv) => {
    const [_, ...fileList] = argv._;
    let { config: configPath, oldTemplate: oldTemplatePath, newTemplate: newTemplatePath } = argv;
    configPath = paths_1.getAbsolutePath(configPath);
    oldTemplatePath = paths_1.getAbsolutePath(oldTemplatePath);
    newTemplatePath = paths_1.getAbsolutePath(newTemplatePath);
    const config = require(configPath);
    const oldTemplate = fs_1.default.readFileSync(oldTemplatePath, 'utf-8');
    const newTemplate = fs_1.default.readFileSync(newTemplatePath, 'utf-8');
    const filePaths = await paths_1.getFilePaths(fileList);
    return {
        config,
        oldTemplate,
        newTemplate,
        filePaths
    };
};
exports.preparePayloadForAdd = prepareRegularPayload;
exports.preparePayloadForRemove = prepareRegularPayload;
