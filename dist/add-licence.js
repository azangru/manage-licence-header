"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const paths_1 = require("./utils/paths");
const licenceManager = __importStar(require("./licence-manager"));
const addLicence = async (argv) => {
    const [_, ...fileList] = argv._;
    let { config: configPath, template: templatePath } = argv;
    configPath = paths_1.getAbsolutePath(configPath);
    templatePath = paths_1.getAbsolutePath(templatePath);
    const config = require(configPath);
    const template = fs_1.default.readFileSync(templatePath, 'utf-8');
    const filePaths = await paths_1.getFilePaths(fileList);
    filePaths.forEach((filePath) => {
        const fileContent = fs_1.default.readFileSync(filePath, 'utf-8');
        const fileExtension = filePath.split('.').pop();
        const withLicence = licenceManager.addLicence(fileContent, template, config[fileExtension]);
        console.log('withLicence', withLicence);
    });
};
exports.default = addLicence;
