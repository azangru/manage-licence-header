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
