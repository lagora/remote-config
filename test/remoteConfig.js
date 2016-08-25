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

const fakeFsEval = (filepath) => filepath.indexOf('.json') > -1;

const fakeFs = {
  existsSync: filepath => fakeFsEval(filepath),
  readFileSync: filepath => fakeFsEval(filepath) ? '' : false,
  writeFileSync: filepath => fakeFsEval(filepath),
}

describe('fileFound', () => {
  it('must return true if a file exists (pretty lame test)', () => {
    assert(fileFound('package.json', fakeFs));
  });
  it('must false if a file is not found (pretty lame test)', () => {
    assert(!fileFound('package.not', fakeFs));
  });
});

describe('getFile', () => {
  it('must return the content of a file', () => {
    assert(typeof getFile('package.json', fakeFs) === 'string');
  });
  it('must return false if the file is not found', () => {
    assert(getFile('package.not', fakeFs) === false);
  });
});

describe('getJSONFile', () => {
  it('must return an object from a JSON file', () => {
    assert(typeof getJSONFile('package.json') === 'object');
  });
  it('must return falase if a JSON file is not found', () => {
    assert(getJSONFile('not.json') === false);
  });
});

describe('mergeArguments', () => {
  it('must merge two objects', () => {
    const result = mergeArguments({ a: 1}, {});
    assert(!!result.config && !!result.a);
  });
});

describe('cantOverwrite', () => {
  it('must return false if args.overwrite === false && file is found', () => {
    assert(cantOverwrite(false, 'package.json'));
  });
});

describe('cantDoRecursive', () => {
  it('must return false if args.recursive === true && file is not json', () => {
    assert(cantDoRecursive(true, 'not.a.json.file'));
  });
});
