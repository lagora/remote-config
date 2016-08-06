#!/usr/bin/env node
var args = require('shell-arguments'); //jshint ignore:line
var remoteConfig = require('./lib/remoteConfig'); //jshint ignore:line
remoteConfig(args); //jshint ignore:line
