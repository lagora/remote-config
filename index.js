 #!/usr/bin/env node
var arguments = require('shell-arguments');
var remoteConfig = require('./lib/remoteConfig');

remoteConfig(arguments).run();
