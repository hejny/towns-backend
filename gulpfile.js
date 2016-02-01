
var gulp = require('gulp'),
    fs = require('fs'),
    jshint = require('gulp-jshint');

// Configuration autoloader
var config = [];
fs.readdirSync("./config").forEach(function(file) {
    if (file.match(/\.json$/) !== null) {
        var name = file.replace('.json', '');
        config[name] = require('./config/' + file);
    }
});

gulp.task('default', function() {
    console.log("There is no default task defined. Please start by defining one.");
});


// Linter
gulp.task("test", function() {
    gulp.src([
        "migrations/*.js",
        "confi/*.json",
        "models/*.js",
        "routes/*.js"
    ])
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});