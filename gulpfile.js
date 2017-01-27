const gulp = require('gulp');
const watch = require('gulp-watch');
const fs = require('fs');
const increaseVersion = require('./index.js')().increaseVersion;

const getCurrentVersion = function() {
    const currVer = fs.readFileSync('./currentVersion.txt', 'utf-8').split(";")[0];
    return currVer;
};

const saveNewVersion = function(newVersion) {
    fs.writeFileSync('./currentVersion.txt', newVersion + ";");
};

var startingVersion = getCurrentVersion();
var newVersion = startingVersion;

gulp.task("updateVersion", function() {
    const curr = getCurrentVersion();
    var newVers = increaseVersion(startingVersion, "minor");
    newVersion = newVers;
    saveNewVersion(newVersion);
    console.log("New version: " + newVers);
});

gulp.task('watch', function() {
    gulp.watch('./*.js', ['updateVersion']);

    gulp.watch('./tests/*.js', ['updateVersion']);
});