var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var order = require("gulp-order");
var concat = require("gulp-concat");
var htmlmin = require('gulp-htmlmin');
var liveserver = require('gulp-live-server');

gulp.task('default', ['sass','sass-concat','js','html','watch','server']);

gulp.task('sass', function () {
	return gulp.src('app/src/sass/**/*.scss')		
   		.pipe(sass().on('error', sass.logError))
   		.pipe(gulp.dest('app/src/css'));
});

gulp.task('sass-concat',['sass'], function(){
	return gulp.src('app/src/css/style.css')
		.pipe(concat('style.min.css'))
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest('dist/assets/css'));
});

gulp.task('js',function(){
	return gulp.src('app/src/js/**/*.js')	
	
        .pipe(concat('script.min.js'))
        .pipe(uglify())
		.pipe(gulp.dest('dist/assets/js'));
});

gulp.task('html', function() {
  return gulp.src('app/*.html')	  
    	.pipe(htmlmin({collapseWhitespace: true}))
    	.pipe(gulp.dest('dist'));
});

gulp.task('watch', function(){
	gulp.watch('app/src/sass/**/*.scss',['sass','sass-concat']);	
	gulp.watch('app/src/js/**/*.js',['js']);	
	gulp.watch('app/*.html',['html']);
});

gulp.task('server', function(){
	var server = liveserver.static('./dist',8000);
	server.start();
	gulp.watch('dist/assets/css/**/*.css', function(f){
		liveserver.notify.apply(server,[f])
	});
	gulp.watch('dist/assets/js/**/*.js', function(f){
		liveserver.notify.apply(server,[f])
	});	
	gulp.watch('dist/*.html', function(f){
		liveserver.notify.apply(server,[f])
	});
});