var syntax        = 'sass', // Syntax: sass or scss;
	gulpversion   = '4'; // Gulp version: 3 or 4

var gulp          = require('gulp'),
	gutil         = require('gulp-util' ),
	sass          = require('gulp-sass'),
	browserSync   = require('browser-sync'),
	concat        = require('gulp-concat'),
	uglify        = require('gulp-uglify'),
	cleancss      = require('gulp-clean-css'),
	rename        = require('gulp-rename'),
	autoprefixer  = require('gulp-autoprefixer'),
	notify        = require('gulp-notify'),
	rsync         = require('gulp-rsync');

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true,
		// port: 8080,
		// tunnel: "avtobon", // Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('styles', function() {
	return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});

gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/bootstrapJs/bootstrap.min.js',
		'app/libs/phonemask/phoneMask.min.js',
		'app/libs/ModernizeJs/modernizr-custom.js',
		'app/libs/videoJs/video.js',
		'app/js/common.js', // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
});

// JS UA
gulp.task('scripts-ua', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/bootstrapJs/bootstrap.min.js',
		'app/libs/phonemask/phoneMask.min.js',
		'app/libs/ModernizeJs/modernizr-custom.js',
		'app/libs/videoJs/video.js',
		'app/js/ua.common.js', // Always at the end
		])
	.pipe(concat('ua.scripts.min.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('code', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('rsync', function() {
	return gulp.src('app/**')
	.pipe(rsync({
		root: 'app/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		// include: ['*.htaccess'], // Includes files to deploy
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});

if (gulpversion == 3) {
	gulp.task('watch', ['styles', 'scripts', 'browser-sync'], function() {
		gulp.watch('app/'+syntax+'/**/*.'+syntax+'', ['styles']);
		gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['scripts']);
		gulp.watch(['libs/**/*.js', 'app/js/ua.common.js'], ['scripts-ua']);
		gulp.watch('app/*.html', ['code'])
	});
	gulp.task('default', ['watch']);
}

if (gulpversion == 4) {
	gulp.task('watch', function() {
		gulp.watch('app/'+syntax+'/**/*.'+syntax+'', gulp.parallel('styles'));
		gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('scripts'));
		gulp.watch(['libs/**/*.js', 'app/js/ua.common.js'], gulp.parallel('scripts-ua'));
		gulp.watch('app/*.html', gulp.parallel('code'))
		gmWatch && gulp.watch('app/img/_src/**/*', gulp.parallel('img'));
	});
	gmWatch ? gulp.task('default', gulp.parallel('img', 'styles', 'scripts', 'scripts-ua', 'browser-sync', 'watch')) 
					: gulp.task('default', gulp.parallel('styles', 'scripts', 'scripts-ua', 'browser-sync', 'watch'));
}
