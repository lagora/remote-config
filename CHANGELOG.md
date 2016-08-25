# Change Log

## [Unreleased]
### Added
- Various callbacks linked to file fetching event
- Stop on first failed file: Can be used if your files follows a serial order
- YAML style configuration file: Why not ?
- overwrite & recursive modes working together: Just because a remote file can't be written doesn't mean we can't use it's content

## [1.0.0]
### Added
- ```key``` option to define where to look for remote files informations
- Recursive option for ```*.json``` file, accessible with ```--recursive=[true|false]```, default to false
- Support for new syntax, allowing more than just an URL (see ```README.md```)

### Changed
Full rewrite in ES6, compiled (so it should not change anything for you)

## [0.0.5] - 2016-08-16
#### - First release for npm
#### - All previous versions are unusable and should not be installed
