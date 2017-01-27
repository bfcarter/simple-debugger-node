const logFilePath = 'tests/logs/logs.txt';
const sDebugger = require('../')({
  logFilePath,
});

describe('debugger', function () {
  this.timeout(20000);

  describe('log to console, save to file', () => {
    it('should log to console and save to file', (done) => {
      sDebugger.debug('normal', 'This is a normal test log');
      done();
    });
  });

  describe('increase version', () => {
    it('should return increased version', (done) => {
      const newVer = sDebugger.increaseVersion('1.1.0', 'major');
      if (newVer !== '1.1.0') {
        done();
      } else {
        done('Could not increase version');
      }
    });
  });
});
