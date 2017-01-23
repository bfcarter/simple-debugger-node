const fs = require('fs');
const colors = require('colors/safe');
const endOfLine = require('os').EOL;

module.exports = function (options) {
  const config = options;
  config.logFilePath = config.logFilePath ? config.logFilePath : 'logs/logs.txt';
  config.logError = config.logError ? config.logError : true;
  config.logWarning = config.logWarning ? config.logWarning : true;
  config.logNormal = config.logNormal ? config.logNormal : false;

  const controller = {};

  const typeToColor = {
    error: 'red',
    warning: 'yellow',
    normal: 'grey',
  };

  const isDebugEnv = process.env.DEBUG === 'true';
  const shouldLogToFile = function (type) {
    if (type === 'error') {
      return config.logError;
    } else if (type === 'warning') {
      return config.logWarning;
    } else if (type === 'normal') {
      return config.logNormal;
    }

    return false;
  };

  controller.debug = function (type, text) {
    const color = typeToColor[type];
    const coloredOutput = colors[color](text);

    if (isDebugEnv) {
      console.log(coloredOutput);
    }

    if (shouldLogToFile(type)) {
      fs.appendFile(config.logFilePath, coloredOutput + endOfLine, (err) => {
        if (err) {
          console.log(colors[typeToColor.error](err));
        }
      });
    }
  };

  return controller;
};
