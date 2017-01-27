const fs = require('fs');
const colors = require('colors/safe');
const endOfLine = require('os').EOL;

module.exports = function (options) {
  let config = options;
  config = config ? config : {};
  config.logFilePath = config.logFilePath ? config.logFilePath : 'logs/logs.txt';
  config.logError = config.logError ? config.logError : true; //errors
  config.logWarning = config.logWarning ? config.logWarning : true; //warning of errors
  config.logNormal = config.logNormal ? config.logNormal : false; //no error

  const controller = {};

  const typeToColor = {
    error: 'red',  //error is red
    warning: 'yellow', //warning is yellow
    normal: 'grey', //normal is grey
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
//debug
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

  controller.increaseVersion = function (currVer, type) {
    const allowedTypes = ['patch', 'minor', 'major'];
    if (!allowedTypes.includes(type)) {
      controller.debug('error', 'Could not increase version of type ' + type);
      return currVer;
    }

    let versionArray = currVer.split('.');

    for (let i = 0; i < versionArray.length; i += 1) {
      const versionIndex = versionArray[i];
      if (versionIndex) {
        versionArray[versionIndex] = parseInt(versionArray[versionIndex]);
      }
    }
    versionArray = versionArray.splice(0, 3);
//patch, minor and major
    switch (type.toLowerCase()) {
      case 'patch':
        versionArray[2] += 1;
        break;
      case 'minor':
        versionArray[1] += 1;
        versionArray[2] = 0;
        break;
      case 'major':
        versionArray[0] += 1;
        versionArray[1] = 0;
        versionArray[2] = 0;  
        break;
      default:
        break;
    }

    return versionArray.join('.');
  };

  return controller;
};
