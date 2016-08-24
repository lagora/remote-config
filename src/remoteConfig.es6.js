import 'babel-polyfill';
import fetch from 'node-fetch';
import {
  existsSync,
  readFileSync,
  writeFileSync,
} from 'fs';

export const getFile = path => (existsSync(path) ? readFileSync(path).toString() : false);
export const getJSONContent = content => JSON.parse(content);
export const getJSONFile = path => getJSONContent(getFile(path));
export const getDefaultArguments = () => getJSONFile('./default.arguments.json');
// export const getConfig = () => {
//   const config = {};
// }

export const checkForRemoteConfigKey = (config, key) => config.key === key;
export const mergeArguments = args => Object.assign({}, getDefaultArguments(), args || {});
// export checkForConfigFile = configFile => configFile || new Error('no config file found');
// export checkForRemotes = remotes => remotes || new Error('no remotes files found');

export function* iterateRemotes(remotes) {
  for (let filepath of Object.keys(remotes)) {
    yield [filepath, remotes[filepath]];
  }
};

export const getResponseAsText = response => response.text();
export const getRemoteFile = (url, callback) => fetch(url).then(getResponseAsText).then(callback);
export const persisRemoteFile = (filepath, content) => writeFileSync(filepath, content, 'utf8');
export const getUrlFromRemoteSpecs = remote => remote.url || remote;
export const isJSON = filepath => filepath.toLoweCase().indexOf('.json') > 1;

export const getRemote = (specs, callback) => {
  const url = getUrlFromRemoteSpecs(specs);
  getRemoteFile(url, callback);
}

export const cycleRemotes = remotes => {
  for (let [filepath, specs] of iterateRemotes(remotes)) {
    const callback = (content) => {
      const fileContent = isJSON(filepath) ? content : getJSONContent(content);
      console.log('filepath', filepath, '\n', 'fileContent', fileContent);
      persisRemoteFile(filepath, fileContent);
    }
    getRemote(specs, callback);
  }
}

export const run = (userArgs) => {
  console.log('userArgs', userArgs);
  const args = mergeArguments(userArgs);
  const configFile = getJSONFile(args.config);

  if (!configFile) {
    return new Error('no config file found');
  }

  const remotes = configFile[args.key]

  if (Object.keys(remotes).length === 0) {
    return new Error('no remotes files found');
  }

  cycleRemotes(remotes);
};

const remoteConfig = {
  getFile,
  getJSONFile,
  getDefaultArguments,
};

export default remoteConfig;

// export const checkConfig = args =>
