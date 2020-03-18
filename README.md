Example of use with a glob: `node src/index.js add "./src/**/*.js"`;
Note the quotation marks around the glob path. Without them, bash will likely try to expand the pattern itself (and might make a poor job out of expanding recursive patterns), which may not be what you want. It's safer with quotes.

Prior art: https://github.com/awjh/license-check-and-add
