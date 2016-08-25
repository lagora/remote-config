#!/usr/bin/env node
var args = require('shell-arguments'); //jshint ignore:line
var remoteConfig = require('./dist/remoteConfig.js'); //jshint ignore:line
remoteConfig.run(args); //jshint ignore:line
