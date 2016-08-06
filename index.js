#!/usr/bin/env node
/*jslint node: true, indent: 2 */
/*global require */

var args = require('shell-args');
var remoteConfig = require('./lib/remoteConfig');

remoteConfig(args);
