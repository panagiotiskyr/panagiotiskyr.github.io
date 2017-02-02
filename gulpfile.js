var gulp = require('gulp'),
	sass = require('gulp-sass'),
	connect = require('gulp-connect'),
	sourcemaps = require('gulp-sourcemaps');

gulp.task('connect', function() {
	connect.server({
		port: 9001,
		livereload: true
	});
});

gulp.task('html', function () {
	gulp.src('*.html')
		.pipe(connect.reload());
});

gulp.task('sass', function () {
	gulp.src('sass/**/style.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('css/'))
		.pipe(connect.reload());
});

gulp.task('js', function () {
	gulp.src('js/main.js')
		.pipe(connect.reload());
});


gulp.task('watch', function () {
	gulp.watch(['*.html'], ['html']);
	gulp.watch(['sass/**/*.scss'], ['sass']);
	gulp.watch(['js/**/*.js'], ['js']);
});


gulp.task('default', ['connect', 'watch']);
