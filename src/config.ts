export type Config = {
  prepend?: string,
  append?: string,
  eachLine?: {
    prepend?: string,
    append?: string
  }
};
export type Configs = {
  [fileExtension: string]: Config
};

const jsCommentFormat: Config = {
  prepend: "/**",
  append: "*/",
  eachLine: {
    prepend: '* '
  }
};

export default {
  js: jsCommentFormat,
  ts: jsCommentFormat,
  tsx: jsCommentFormat
};
