To install the application use command:

    npm install simple-debugger-node

To test the application:

    npm run test

How to use in application:


    var sDebugger = require("simple-debugger-node")({
    	logFilePath: "logs/logs.txt"
    });
    
    sDebugger.debug("normal", "This is a normal message");
    sDebugger.debug("error", "This is an error message");
    sDebugger.debug("warning", "This is a warning message");

