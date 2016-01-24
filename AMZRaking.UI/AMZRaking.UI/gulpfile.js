/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
        rimraf = require("rimraf"),
        concat = require("gulp-concat"),
        cssmin = require("gulp-cssmin"),
        uglify = require("gulp-uglify"),
		rename = require('gulp-rename'),
		sass = require('gulp-sass');;

var paths = {
        webroot: "./"
};

paths.js = paths.webroot + "Scripts/jssrc/*.js";
//paths.minJs = paths.webroot + "Scripts/*.min.js";
paths.sass = paths.webroot + "Content/scss/*.scss";
paths.css = paths.webroot + "Content/**/*.css";
paths.minCss = paths.webroot + "Content/**/*.min.css";
paths.concatJsDest = paths.webroot + "Scripts/site.min.js";
paths.concatCssDest = paths.webroot + "Content/style.min.css";

gulp.task('default', ['clean' ,'min','sass']);

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("clean:js", function (cb) {
        rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
        rimraf(paths.concatCssDest, cb);
});


gulp.task("min", ["min:js", "min:css"]);
gulp.task("min:js", function () {
        return gulp.src(paths.js)
                //.pipe(concat(paths.concatJsDest))
                .pipe(uglify())
                .pipe(gulp.dest("Scripts"));
});

gulp.task("min:css", function () {
        return gulp.src([paths.css, "!" + paths.minCss])
                //.pipe(concat(paths.concatCssDest))
                .pipe(cssmin())
                .pipe(gulp.dest("."));
});

gulp.task('sass', function(done) {
  
  gulp.src(paths.sass)
    .pipe(sass())
    .pipe(gulp.dest(paths.webroot+'/Content/'))
    .pipe(cssmin({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(paths.webroot+'/Content/'))
    .on('end', done);
 
});
gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['min:js']);
});

gulp.task('dev',['sass', 'copyJs'], function(){
	gulp.watch(paths.sass, ['sass']);
	gulp.watch(paths.js, ['copyJs']);
});


