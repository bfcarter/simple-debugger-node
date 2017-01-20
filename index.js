const fs = require('fs');
const colors = require('colors/safe');
const endOfLine = require('os').EOL;

module.exports = function (options) {
  const config = options;
  config.logFilePath = config.logFilePath ? config.logFilePath : 'logs/logs.txt';

  const controller = {};

  const typeToColor = {
    error: 'red',
    warning: 'yellow',
    normal: 'grey',
  };

  const isDebugEnv = process.env.DEBUG === 'true';

  controller.debug = function (type, text) {
    const color = typeToColor[type];
    const coloredOutput = colors[color](text);

    if (isDebugEnv) {
      console.log(coloredOutput);
    }

    fs.appendFile(config.logFilePath, coloredOutput + endOfLine, (err) => {
      if (err) {
        console.log(colors[typeToColor.error](err));
      }
    });
  };

  return controller;
};
