# remote-config
[![Build Status](https://travis-ci.org/lagora/remote-config.svg?branch=dev)](https://travis-ci.org/lagora/remote-config) [![codecov](https://codecov.io/gh/lagora/remote-config/branch/dev/graph/badge.svg)](https://codecov.io/gh/lagora/remote-config)
 [![Coverage Status](https://coveralls.io/repos/github/lagora/remote-config/badge.svg?branch=dev)](https://coveralls.io/github/lagora/remote-config?branch=dev) [![Dependency Status](https://dependencyci.com/github/lagora/remote-config/badge)](https://dependencyci.com/github/lagora/remote-config)
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
--overwrite=[true|false] // default: true
--verbose=[true|false] // default: true
--recursive=[true|false] // default: true
```

### Minimalistic config file
Remote-config will look in the defined config file for the "remote-config" key, containing pairs such as "filepath_to_write": "url_to_fetch".
```
{
  "remote-config": {
    ".jshintrc": "https://raw.githubusercontent.com/jshint/jshint/master/examples/.jshintrc"
  }
}
```

### Tips ?
You can, obviously, use remote-config to download a file containing various other config files.
So you'll had to only remember one url, go figure.
