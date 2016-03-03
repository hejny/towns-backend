
var gulp = require('gulp'),
    fs = require('fs'),
    jshint = require('gulp-jshint'),
    env = require('gulp-env');

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
    env.set({ NODE_ENV: 'test' });

    gulp.src([
        "migrations/*.js",
        "config/*.json",
        "handlers/*.js",
        "models/*.js",
        "routes/*.js",
        "test/*.js",
        "*.js"

    ])
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
    console.log("Tests have finished");
});