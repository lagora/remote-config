/*jslint node: true, indent: 2 */
/*global require */
"use strict";
var fetch = require('node-fetch');
var fs = require('fs');

function remoteConfig(args) {
  args = args || {};
  args.config = args.config || './package.json';
  args.overwrite = !!args.overwrite || false;
  args.verbose = !!args.verbose || false;
  args.remoteConfigKey = 'remote-config';

  var remote,
    remotes = [],
    entry,
    entries,
    index;

  function getFile(options) {
    return fetch(options.url)
      .then(function (response) {
        var content = response[options.format]();
        return content;
      })
      .then(function (content) {
        fs.writeFile(options.filepath, content, 'utf8', options.callback);
      });
  }

  function eachRemote(exists) {
    if (exists && args.verbose) {
      if (exists && !args.overwrite) {
        console.log('SKIP (overwrite: false): ' + remote.filepath);
      }
    }

    if (!exists || (exists && args.overwrite === true)) {
      if (args.verbose) {
        console.log('WRITING : ' + remote.filepath);
      }
      getFile(Object.assign({}, remote));
    }
  }

  fs.readFile(args.config, function (err, packageJson) {
    if (err) {
      console.error(err);
      return false;
    }

    packageJson = packageJson.toString();

    if (packageJson.length === 0) {
      console.error('no usable content found inside ' + packageJson);
    }

    packageJson = JSON.parse(packageJson);

    if (packageJson[args.remoteConfigKey] === undefined) {
      console.error('no "' + args.remoteConfigKey + '" found inside "' + args.config + '"');
      return false;
    }

    var remoteCfg = packageJson['remote-config'];
    entries = Object.keys(remoteCfg);
    for (index = 0; index < entries.length; index += 1) {
      entry = entries[index];
      remotes.push({
        overwrite: !!args.overwrite,
        url: remoteCfg[entry],
        filepath: entry,
        format: entry.toLowerCase().indexOf('.json') > 0 ? 'json' : 'text',
      });
    }

    for (index = 0; index < remotes.length; index += 1) {
      remote = remotes[index];
      fs.exists(remote.filepath, eachRemote);
    }
  });
}

module.exports = remoteConfig;
