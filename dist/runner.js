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
const prepare_payload_1 = require("./prepare-payload");
const licenceManager = __importStar(require("./licence-manager"));
exports.addLicence = async (argv) => {
    const { config, template, filePaths } = await prepare_payload_1.preparePayloadForAdd(argv);
    filePaths.forEach((filePath) => {
        const fileContent = fs_1.default.readFileSync(filePath, 'utf-8');
        const fileExtension = filePath.split('.').pop();
        const configForExtension = config[fileExtension] || {};
        const withLicence = licenceManager.addLicence(fileContent, template, configForExtension);
        fs_1.default.writeFileSync(filePath, withLicence);
    });
};
exports.removeLicence = async (argv) => {
    const { config, template, filePaths } = await prepare_payload_1.preparePayloadForRemove(argv);
    filePaths.forEach((filePath) => {
        const fileContent = fs_1.default.readFileSync(filePath, 'utf-8');
        const fileExtension = filePath.split('.').pop();
        const configForExtension = config[fileExtension] || {};
        const withLicence = licenceManager.removeLicence(fileContent, template, configForExtension);
        fs_1.default.writeFileSync(filePath, withLicence);
    });
};
exports.replaceLicence = async (argv) => {
    const { config, oldTemplate, newTemplate, filePaths } = await prepare_payload_1.preparePayloadForReplace(argv);
    filePaths.forEach((filePath) => {
        const fileContent = fs_1.default.readFileSync(filePath, 'utf-8');
        const fileExtension = filePath.split('.').pop();
        const configForExtension = config[fileExtension] || {};
        const withLicence = licenceManager.replaceLicence(fileContent, oldTemplate, newTemplate, configForExtension);
        fs_1.default.writeFileSync(filePath, withLicence);
    });
};
