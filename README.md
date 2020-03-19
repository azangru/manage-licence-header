# Purpose
The purpose of this package is to add licence headers to source code files.

# Requirements
- Node (preferably the latest LTS).

# How to use
## (Optional) create a tarball
- Create a package with `npm pack`.

## Install the package locally
- Install the package (`npm install <path to directory with source code or to tarball>`)
- Run `node_modules/.bin/manage-licence-header` in the console or write `npm run manage-licence-header` in the `scripts` field of package.json and pass relevant options to it.

## Run with npx without installing
`npx --p <repo url> manage-licence-header command options`

## Commands

### Add
Adds licence header to files

Usage: `manage-licence-header add options file_path_patterns`

#### Options:
- `config` – path to config
- `template` — path to licence header template

### Remove
Removes licence header (as specified in the template file) from files

Usage: `manage-licence-header remove options file_path_patterns`

#### Options:
- `config` – path to config
- `template` — path to licence header template

### Replace
Removes licence header (as specified in the template file) from files

Usage: `manage-licence-header replace options file_path_patterns`

#### Options:
- `config` – path to config
- `oldTemplate` — path to licence header template to remove
- `newTemplate` — path to licence header template to add

## File path patterns
The package uses [globby](https://github.com/sindresorhus/globby) and understands all file patterns that are valid for globby

### Examples
- simple path to file: `manage-licence-header add ./example.ts`
- simple paths to multiple files: `manage-licence-header add ./example1.ts example2.ts`
- all files in a directory (recursively): `manage-licence-header add "src/**/*.ts"` (notice the quotation marks around the glob path; without them bash will likely try to expand the pattern itself, which is likely not what you want)
- all files in a directory except for test files: `E=! && manage-licence-header add "src/**/*.ts" "${E}src/**/*.test.ts"` (the negation marker is an exclamation point; but note the trick with assigning it to a variable — `E=!` — to prevent bash from interpreting it as the beginning of a shell command)

# Prior art
https://github.com/awjh/license-check-and-add
