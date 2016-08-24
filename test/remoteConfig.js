import 'babel-polyfill';
import assert from 'assert';
import {
  fileFound,
  getFile,
  getJSONFile,
  mergeArguments,
  persistRemoteFile,
  getRemoteFile,
  getUrlFromRemoteSpecs,
  getRemote,
  cantOverwrite,
  cantDoRecursive,
  msg,
} from '../src/remoteConfig.es6';

describe('fileFound', () => {
  it('must return true if a file exists (pretty lame test)', () => {
    assert(fileFound('package.json'));
  });
});

describe('getFile', () => {
  it('must return the content of a file', () => {
    assert(typeof getFile('package.json') === 'string');
  });
});

describe('getJSONFile', () => {
  it('must return an object from a JSON file', () => {
    assert(typeof getJSONFile('package.json') === 'object');
  });
});

describe('mergeArguments', () => {
  it('must merge two objects', () => {
    const result = mergeArguments({ a: 1}, { b: 2});
    assert(result.a === 1 && result.b === 2);
  });
});
