'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = exports.cycleRemotes = exports.msg = exports.cantDoRecursive = exports.cantOverwrite = exports.getRemote = exports.getUrlFromRemoteSpecs = exports.getRemoteFile = exports.persistRemoteFile = exports.mergeArguments = exports.getJSONFile = exports.getFile = exports.fileFound = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.iterateRemotes = iterateRemotes;

require('babel-polyfill');

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [iterateRemotes].map(regeneratorRuntime.mark);

var defaultArguments = {
  "config": "package.json",
  "key": "remote-config",
  "overwrite": true,
  "verbose": true,
  "recursive": true
};

var fileFound = exports.fileFound = function fileFound(filepath) {
  return fs.existsSync(filepath);
};
var getFile = exports.getFile = function getFile(filepath) {
  return fileFound(filepath) ? fs.readFileSync(filepath).toString() : false;
};
var getJSONFile = exports.getJSONFile = function getJSONFile(path) {
  return JSON.parse(getFile(path));
};
var mergeArguments = exports.mergeArguments = function mergeArguments(args) {
  return Object.assign({}, defaultArguments, args || {});
};

function iterateRemotes(remotes) {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, filepath;

  return regeneratorRuntime.wrap(function iterateRemotes$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 3;
          _iterator = Object.keys(remotes)[Symbol.iterator]();

        case 5:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 12;
            break;
          }

          filepath = _step.value;
          _context.next = 9;
          return [filepath, remotes[filepath]];

        case 9:
          _iteratorNormalCompletion = true;
          _context.next = 5;
          break;

        case 12:
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context['catch'](3);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 18:
          _context.prev = 18;
          _context.prev = 19;

          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }

        case 21:
          _context.prev = 21;

          if (!_didIteratorError) {
            _context.next = 24;
            break;
          }

          throw _iteratorError;

        case 24:
          return _context.finish(21);

        case 25:
          return _context.finish(18);

        case 26:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this, [[3, 14, 18, 26], [19,, 21, 25]]);
};

var persistRemoteFile = exports.persistRemoteFile = function persistRemoteFile(filepath, content) {
  return fs.writeFileSync('./' + filepath, content, 'utf8');
};
var getRemoteFile = exports.getRemoteFile = function getRemoteFile(url, callback) {
  return (0, _nodeFetch2.default)(url).then(function (response) {
    return response.text();
  }).then(callback);
};
var getUrlFromRemoteSpecs = exports.getUrlFromRemoteSpecs = function getUrlFromRemoteSpecs(remote) {
  return remote.url || remote;
};
var getRemote = exports.getRemote = function getRemote(specs, callback) {
  return getRemoteFile(getUrlFromRemoteSpecs(specs), function (content) {
    return callback(content);
  });
};
var cantOverwrite = exports.cantOverwrite = function cantOverwrite(overwrite, filepath) {
  return !overwrite && fileFound(filepath);
};
var cantDoRecursive = exports.cantDoRecursive = function cantDoRecursive(recursive, filepath) {
  return recursive && /\.json/i.test(filepath);
};
var msg = exports.msg = function msg(args, _msg) {
  return args.verbose ? console.log(_msg) : false;
};

var cycleRemotes = exports.cycleRemotes = function cycleRemotes(remotes, args) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    var _loop = function _loop() {
      var _step2$value = _slicedToArray(_step2.value, 2);

      var filepath = _step2$value[0];
      var specs = _step2$value[1];

      msg(args, '\nDOING: ' + filepath);

      var key = args.key;
      var overwrite = args.overwrite;
      var recursive = args.recursive;

      var mergedSpecs = { key: key, config: filepath, overwrite: overwrite, recursive: recursive };
      var callback = function callback(fileContent) {
        if (cantOverwrite(args.overwrite, filepath)) {
          msg(args, 'OVERWRITE: ' + args.overwrite + ' so SKIPPING: ' + filepath);
        } else {
          msg(args, 'DONE: ' + filepath);
          persistRemoteFile(filepath, fileContent);
        }
        if (cantDoRecursive(args.recursive, filepath)) {
          msg(args, 'RECURSIVE: ' + args.recursive + ' so RUNNING: ' + filepath);
          run(Object.assign({}, args, { config: filepath }));
        } else if (args.recursive) {
          msg(args, 'RECURSIVE: ' + args.recursive + ' yet ' + filepath + ' is not a *.json file');
        }
      };
      getRemote(Object.assign({}, specs, mergedSpecs), callback);
    };

    for (var _iterator2 = iterateRemotes(remotes)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
};

var run = exports.run = function run(userArgs) {
  var args = mergeArguments(userArgs);
  var configFile = getJSONFile(args.config);

  if (!configFile) {
    return new Error('no config file found');
  }

  if (Object.keys(configFile[args.key]).length === 0) {
    return new Error('no remotes files found');
  }

  cycleRemotes(configFile[args.key], args);
};

exports.default = run;
