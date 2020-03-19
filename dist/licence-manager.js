"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addLicence = (fileContent, licenceText, config) => {
    if (!hasLicence(fileContent, licenceText, config)) {
        return fileContent;
    }
    const licenceComment = prepareLicenceComment(licenceText, config);
    return `${licenceComment}\n\n${fileContent}`;
};
exports.addLicence = addLicence;
const removeLicence = (fileContent, licenceText, config) => {
    const licenceComment = prepareLicenceComment(licenceText, config);
    const fileWithoutLicence = fileContent.replace(licenceComment, '');
    return fileWithoutLicence.replace(/^\s+/, '');
};
exports.removeLicence = removeLicence;
const replaceLicence = (fileContent, oldLicence, newLicence, config) => {
    const cleanFileContent = removeLicence(fileContent, oldLicence, config);
    return addLicence(cleanFileContent, newLicence, config);
};
exports.replaceLicence = replaceLicence;
const prepareLicenceComment = (licenceText, config) => {
    licenceText = licenceText.trim();
    const { prepend, append, eachLine: { prepend: prependEachLine = '', append: appendEachLine = '' } = {} } = config;
    const lines = licenceText.split('\n');
    const result = [];
    if (prepend) {
        result.push(prepend);
    }
    for (let line of lines) {
        line = `${prependEachLine}${line}${appendEachLine}`.trim();
        result.push(line);
    }
    if (append) {
        result.push(append);
    }
    return result.join('\n');
};
const hasLicence = (fileContent, licenceText, config) => {
    const comment = prepareLicenceComment(licenceText, config);
    return !fileContent.includes(comment);
};
