"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsCommentFormat = {
    prepend: "/**",
    append: "*/",
    eachLine: {
        prepend: '* '
    }
};
exports.default = {
    js: jsCommentFormat,
    ts: jsCommentFormat,
    tsx: jsCommentFormat
};
