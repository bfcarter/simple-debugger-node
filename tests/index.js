var assert = require("assert");

var logFilePath = "tests/logs/logs.txt";
var sDebugger = require("../")({
    logFilePath: logFilePath
});

describe("debugger", function() {
    this.timeout(20000);

    describe("log to console, save to file", function() {
        it("log to console and save to file", function(done) {
            sDebugger.debug("normal", "This is a normal test log");
            done();
        });
    });
});