import 'babel-polyfill';
import fetch from 'node-fetch';
import * as fs from 'fs';

const defaultArguments = {
  config: 'package.json',
  key: 'remote-config',
  overwrite: true,
  verbose: true,
  recursive: true,
};

export const fileFound = filepath => fs.existsSync(filepath);
export const getFile = filepath => fileFound(filepath) ? fs.readFileSync(filepath).toString() : false;// eslint-disable-line
export const getJSONFile = path => JSON.parse(getFile(path));
export const mergeArguments = args => Object.assign({}, defaultArguments, args || {});

export function* iterateRemotes(remotes) {
  for (const filepath of Object.keys(remotes)) {
    yield [filepath, remotes[filepath]];
  }
}

export const persistRemoteFile = (filepath, content) => fs.writeFileSync(
  `./${filepath}`, content, 'utf8'
);
export const getRemoteFile = (url, callback) => fetch(url)
.then(response => response.text()).then(callback);
export const getUrlFromRemoteSpecs = remote => remote.url || remote;
export const getRemote = (specs, callback) => getRemoteFile(
  getUrlFromRemoteSpecs(specs), content => callback(content)
);
export const cantOverwrite = (overwrite, filepath) => !overwrite && fileFound(filepath);// eslint-disable-line
export const cantDoRecursive = (recursive, filepath) => recursive && /\.json/i.test(filepath);// eslint-disable-line
export const msg = (args, text) => args.verbose ? console.log(text) : false;// eslint-disable-line

export const cycleRemotes = (remotes, args) => {
  for (const [filepath, specs] of iterateRemotes(remotes)) {
    msg(args, `\nDOING: ${filepath}`);

    const { key, overwrite, recursive } = args;
    const mergedSpecs = { key, config: filepath, overwrite, recursive };
    const callback = fileContent => {
      if (cantOverwrite(args.overwrite, filepath)) {
        msg(args, `OVERWRITE: ${args.overwrite} so SKIPPING: ${filepath}`);
      } else {
        msg(args, `DONE: ${filepath}`);
        persistRemoteFile(filepath, fileContent);
      }

      if (cantDoRecursive(args.recursive, filepath)) {
        msg(args, `RECURSIVE: ${args.recursive} so RUNNING: ${filepath}`);
        run(Object.assign({}, args, { config: filepath }));// eslint-disable-line
      } else if (args.recursive) {
        msg(args, `RECURSIVE: ${args.recursive} yet ${filepath} is not a *.json file`);
      }
    };

    getRemote(Object.assign({}, specs, mergedSpecs), callback);
  }
};

export function run(userArgs) {
  const args = mergeArguments(userArgs);
  const configFile = getJSONFile(args.config);

  if (!configFile) {
    return new Error('no config file found');
  }

  if (Object.keys(configFile[args.key]).length === 0) {
    return new Error('no remotes files found');
  }

  return cycleRemotes(configFile[args.key], args);
}
