export type Config = {
  [fileExtension: string]: {
    prepend?: string,
    append?: string,
    eachLine?: {
      prepend?: string,
      append?: string
    }
  }
};

const jsCommentFormat = {
  prepend: "/**",
  append: "*/",
  eachLine: {
    prepend: '* '
  }
};

module.exports = {
  js: jsCommentFormat,
  ts: jsCommentFormat,
  tsx: jsCommentFormat
};
