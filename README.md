# remote-config

[![Greenkeeper badge](https://badges.greenkeeper.io/lagora/remote-config.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/lagora/remote-config.svg?branch=dev)](https://travis-ci.org/lagora/remote-config) [![codecov](https://codecov.io/gh/lagora/remote-config/branch/dev/graph/badge.svg)](https://codecov.io/gh/lagora/remote-config) [![Dependency Status](https://dependencyci.com/github/lagora/remote-config/badge)](https://dependencyci.com/github/lagora/remote-config)

## A small tool to get remote configuration files (.eslintrc, etc)

## Disclaimer :
#### This module is provided as is, I decline any responsability for any consequences, wrong doing, unexpected effects linked in any way to the usage of the aforementioned module.
#### This module shoudn't be considered as production-ready.

## Usage :
```
remote-config [OPTIONS]
```

## Options :
```
--config=package.json // default: "package.json"
```
Define what JSON file will contain remote config files URLs

```
--key=remote-config // default: "remote-config"
```
Define where to look inside the configuration file

```
--overwrite=[true|false] // default: true
```
Whether the fetched file will be overwritten locally or not.
Incompatible with recursive (should be compatible in future release)

```
--verbose=[true|false] // default: true
```
Self explanatory

```
--recursive=[true|false] // default: false
```
Whether to use each fetched file as a configuration file. Usefull for nested remote configuration files.

### Minimalistic config file
Remote-config will look in the defined config file for the "remote-config" key, containing pairs such as "filepath_to_write": "url_to_fetch".
```
{
  "remote-config": {
    ".babelrc": "https://raw.githubusercontent.com/lagora/remote-config/master/.babelrc"
  }
}
```

### Alternative syntax (for future usage)
```
{
  "remote-config": {
    ".babelrc": {
      "url": "https://raw.githubusercontent.com/lagora/remote-config/master/.babelrc"
    }
  }
}
```

### Tips ?
You can, obviously, use remote-config to download a file containing various other config files.
So you'll had to only remember one url, go figure.
