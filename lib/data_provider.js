// Generated by CoffeeScript 1.6.3
(function() {
  var compData, dataFilePaths, env, fileWatcher, fs, loadData, path, urlData, _;

  fs = require("fs");

  path = require("path");

  fileWatcher = require("./file_watcher");

  env = require("./enviroments");

  _ = require("lodash");

  dataFilePaths = env.dataFiles;

  urlData = {};

  compData = {};

  loadData = function(dataFilePath) {
    var data;
    if (fs.existsSync(dataFilePath)) {
      data = require(dataFilePath);
      urlData = _.assign(urlData, data.urls);
      return compData = _.assign(compData, data.comps);
    }
  };

  _.each(dataFilePaths, loadData);

  fileWatcher.watchFiles(dataFilePaths, function(dataFilePath) {
    var err;
    require.cache[dataFilePath] = null;
    try {
      loadData(dataFilePath);
      return console.log("[Data Reload] " + dataFilePath);
    } catch (_error) {
      err = _error;
      return console.log("[Data Reload Error] " + dataFilePath + " - " + err);
    }
  });

  module.exports = {
    getUrlData: function(path, method, params) {
      var data;
      if (!_.has(urlData, path)) {
        return {
          found: false
        };
      }
      data = urlData[path];
      return {
        found: true,
        result: _.isFunction(data) ? data(params, method) : data
      };
    },
    getCompData: function(path, params) {
      var data;
      if (!_.has(compData, path)) {
        return {
          found: false
        };
      }
      data = compData[path];
      return {
        found: true,
        result: _.isFunction(data) ? data(params) : data
      };
    }
  };

}).call(this);
