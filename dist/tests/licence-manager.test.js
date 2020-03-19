"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const licence_manager_1 = require("../licence-manager");
const config_1 = __importDefault(require("../config"));
const licenceText = fs_1.default
    .readFileSync(path_1.default.resolve(__dirname, 'fixtures/lorem-ipsum.txt'), 'utf-8')
    .trim();
const newLicenceText = fs_1.default
    .readFileSync(path_1.default.resolve(__dirname, 'fixtures/zombie-ipsum.txt'), 'utf-8')
    .trim();
const sampleSourceFile = fs_1.default
    .readFileSync(path_1.default.resolve(__dirname, 'fixtures/example.js'), 'utf-8')
    .trim();
describe('licence-manager', () => {
    const config = config_1.default.js;
    describe('addLicence', () => {
        it('adds licence to the head of the file', () => {
            expect(licence_manager_1.addLicence(sampleSourceFile, licenceText, config)).toMatchSnapshot();
        });
        it('does not modify file already containing licence', () => {
            const fileWithLicence = licence_manager_1.addLicence(sampleSourceFile, licenceText, config);
            expect(licence_manager_1.addLicence(fileWithLicence, licenceText, config)).toMatchSnapshot();
        });
    });
    describe('removeLicence', () => {
        it('removes licence from the head of the file', () => {
            const fileWithLicence = licence_manager_1.addLicence(sampleSourceFile, licenceText, config);
            expect(licence_manager_1.removeLicence(fileWithLicence, licenceText, config)).toBe(sampleSourceFile);
        });
    });
    describe('replaceLicence', () => {
        it('replaces old licence with the new one', () => {
            const fileWithLicence = licence_manager_1.addLicence(sampleSourceFile, licenceText, config);
            expect(licence_manager_1.replaceLicence(fileWithLicence, licenceText, newLicenceText, config)).toMatchSnapshot();
        });
    });
});
