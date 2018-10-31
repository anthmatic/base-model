var gulp = require('gulp')
var sass = require('gulp-dart-sass')
var runSequence = require('run-sequence')
var readYaml = require('read-yaml')
var ftp = require( 'vinyl-ftp')
var gutil = require('gutil')

gulp.task('sass', function() {
    return gulp.src('./src/assets/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./build/assets/css'))
})

gulp.task('build', function(callback) {
    runSequence('sass', callback)
  })

gulp.task('deploy', function () {
  
  var config = readYaml.sync('config.yml');

  var conn = ftp.create( {
      host: 'ftp.hubapi.com',
      user: config.creds.username,
      password: config.creds.password,
      parallel: 2,
      port: 3200,
      secure: true,
      log: gutil.log
  } );

  var globs = [
      'build/**'
  ];

  return gulp.src( globs, { base: './build/', buffer: false } )
    .pipe(conn.newer(config.folder_root)) 
    .pipe(conn.dest(config.folder_root))
    .pipe(conn.clean(`${config.folder_root}/**`,'./build'))
})