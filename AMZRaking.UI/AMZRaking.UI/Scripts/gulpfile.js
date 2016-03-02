var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var merge = require('merge2');
var ignore = require('gulp-ignore');
var clean  =  require('gulp-clean');

//file Path

var amzPath = "./";
var amzsassPath = amzPath + "Content/scss/*.scss";
var amzJsPath = amzPath+'/Scripts/jssrc/';
var amzVendorJsPath = amzPath+'/Scripts/vendor/';
var amzCoreFiles = [
	amzJsPath +'amz-core.js',
	amzJsPath +'amz-form.js',
	amzJsPath +'amz-ui.js',
	amzJsPath +'amz-url.js',
	amzJsPath +'amz-utils.js'

];

// expport path
var paths = {
  webroot: amzPath,
  sass: amzsassPath,
  amzJsSrc: [amzJsPath+'*.js'],
  amzJsVendor: [amzVendorJsPath+'/*.js'],
  amzJs: [amzJsPath+'*.js', amzVendorJsPath+'*.js'],
  js: [amzPath+'*.js', amzVendorJsPath+'*.js'],
 
};

// paths.js = paths.webroot + "Scripts/jssrc/*.js";
// //paths.minJs = paths.webroot + "Scripts/*.min.js";
// paths.sass = paths.webroot + "Content/scss/*.scss";
// paths.css = paths.webroot + "Content/**/*.css";
// paths.minCss = paths.webroot + "Content/**/*.min.css";
// paths.concatJsDest = paths.webroot + "Scripts/site.min.js";
// paths.concatCssDest = paths.webroot + "Content/style.min.css";

gulp.task('default', ['sass' ,'amzMinify','watch']);

// gulp.task("clean", ["clean:js", "clean:css"]);

// gulp.task("clean:js", function (cb) {
        // rimraf(paths.concatJsDest, cb);
// });

// gulp.task("clean:css", function (cb) {
        // rimraf(paths.concatCssDest, cb);
// });


// gulp.task("min", ["min:js", "min:css"]);
// gulp.task("min:js", function () {
        // return gulp.src(paths.js)
                // //.pipe(concat(paths.concatJsDest))
                // .pipe(uglify())
                // .pipe(gulp.dest("Scripts"));
// });

// gulp.task("min:css", function () {
        // return gulp.src([paths.css, "!" + paths.minCss])
                // //.pipe(concat(paths.concatCssDest))
                // .pipe(cssmin())
                // .pipe(gulp.dest("."));
// });

gulp.task('sass', function(done) {
  gulp.src(paths.sass)
    .pipe(sass())
    .pipe(gulp.dest(paths.webroot+'/Content/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(paths.webroot+'/Content/'))
    .on('end', done);
});

gulp.task('amzLint', function(done){
	return gulp.src(paths.amzJsSrc)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));	
});
gulp.task('buildAmzCore',['amzLint'], function(){
	return gulp.src(amzCoreFiles)
		.pipe(concat('core.js'))
		.pipe(gulp.dest(amzJsPath));
})
gulp.task('amzMinify', ['buildAmzCore'], function(){
	var minify = gulp.src(paths.amzJs)
		.pipe(uglify())
		.pipe(gulp.dest(amzPath+'/Scripts'))
	var cleanCode = gulp.src('./core.js', {read: false})
		.pipe(clean());
	return merge(minify, cleanCode);
});

gulp.task('copyJs',['buildAmzCore'], function(){	
	var copy  = gulp.src(paths.js)
		.pipe(gulp.dest(amzPath+'/Scripts'));
	var cleanCode = gulp.src('./core.js', {read: false})
		.pipe(clean());
	return merge(copy, cleanCode);
});
gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['amzMinify']);
});

gulp.task('dev',['sass', 'copyJs'], function(){
	gulp.watch(paths.sass, ['sass']);
	gulp.watch(paths.js, ['copyJs']);
});



