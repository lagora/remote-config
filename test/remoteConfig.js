import 'babel-polyfill';
import assert from 'assert';
import {
  getFile,
  getJSONFile,
  getDefaultArguments,
  checkForRemoteConfigKey,
  getRemoteFile,
  run,
} from '../src/remoteConfig.es6';

describe('remoteConfig.*', () => {
  describe('*.getFile', () => {
    it('must read a file given it\'s filepath', () => {
      const configFile = getFile('./default.arguments.json');
      assert(typeof configFile === 'string');
      assert(configFile.length > 2);
    });

    it('must return false if the filepath is wrong', () => assert(!getFile('./not.to.be.found')));
  });

  describe('*.getJSONFile', () => {
    it('must read a JSON file given it\'s filepath', () => assert(
      typeof getJSONFile('./default.arguments.json') === 'object')
    );
    it('must return false if the filepath is wrong', () => assert(!getJSONFile('./not.to.be.found')));
  });

  describe('*.getDefaultArguments', () => {
    it('must return the default config', () => {
      const args = getDefaultArguments();
      assert(typeof args === 'object');
      describe('default config values', () => {
        it('config must be \'package.json\'', () => assert(args.config === 'package.json'));
        it('key must be \'remote-config\'', () => assert(args.key === 'remote-config'));
        it('overwrite must be FALSE', () => assert(args.overwrite === false));
        it('verbose must be FALSE', () => assert(args.verbose === true));
        it('recursive must be FALSE', () => assert(args.recursive === false));
      });
    });
  });

  describe('*.checkForRemoteConfigKey', () => {
    it('must return TRUE if the key is present in the config', () => assert(
      checkForRemoteConfigKey(getDefaultArguments(), 'remote-config')
    ));
  })

  describe('*.getRemoteFile', () => {
    it('must return ', () => {
      const filepath = 'remote-config.json';
      const url = 'https://gist.githubusercontent.com/lagora/7df78ecd604d77d5e65bd6f74a7cf137/raw/6f143584825e7cd8363e8910f2dc0e8ff41fd3b1/remote-config.json';
      getRemoteFile(url);
    });
  });

  describe('*.run', () => {
    it('', () => {
      run();
    });
  });
});
