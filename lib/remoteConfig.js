var fetch = require('node-fetch');
var fs = require('fs');

var remoteConfig = function (arguments) {
  console.log('arguments', arguments);
  arguments = arguments || {};
  arguments.config = './package.json';
  arguments.overwrite = !!arguments.overwrite || false;
  arguments.verbose = !!arguments.verbose || false;
  var packageJson = fs.readFileSync(arguments.config);
  packageJson = packageJson.toString();
  packageJson = JSON.parse(packageJson);

  var remoteConfig = packageJson['remote-config'];
  remoteConfigEntries = Object.keys(remoteConfig);
  var remotes = [];
  for (var entry of remoteConfigEntries) {
    remotes.push({
      overwrite: !!arguments.overwrite,
      url: remoteConfig[entry],
      filepath: entry,
      format: entry.toLowerCase().indexOf('.json') > 0 ? 'json' : 'text'
    });
  }

  function getFile(options) {
    return fetch(options.url)
    .then(function (response) {
      var content = response[options.format]();
      console.log('options', options);
      return content;
    })
    .then(function (content) {
      console.log('content', content);
      fs.writeFileSync(options.filepath, content, 'utf8', options.callback);
    });
  }

  function run() {
    for (var remote of remotes) {
      var exists = fs.existsSync(remote.filepath);

      if (this.arguments.verbose) {
        console.log('EXISTS : ' + remote.filepath);
      }

      if (!exists || (exists && this.arguments.overwrite === true)) {
        getFile(Object.assign({}, remote));
      }
    }
  }

  return {
    arguments: arguments,
    getFile: getFile,
    run: run
  }
};

module.exports = remoteConfig;
