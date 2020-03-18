"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const globby_1 = __importDefault(require("globby"));
const getAbsolutePath = (filePath) => {
    if (!path_1.default.isAbsolute(filePath)) {
        filePath = path_1.default.resolve(process.cwd(), filePath);
    }
    return filePath;
};
exports.getAbsolutePath = getAbsolutePath;
const getFilePathsFromGlob = async (pattern) => {
    return await globby_1.default(pattern, { absolute: true });
};
const getFilePaths = async (patterns) => {
    const filePathsPromises = patterns.reduce((result, pattern) => {
        return result.concat(getFilePathsFromGlob(pattern));
    }, []);
    const filePaths = await Promise.all(filePathsPromises);
    return filePaths.flat(Infinity);
};
exports.getFilePaths = getFilePaths;
