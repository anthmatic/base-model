var gulp = require('gulp')
var sass = require('gulp-dart-sass')
var runSequence = require('run-sequence')

gulp.task('sass', function() {
    return gulp.src('./src/assets/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./build/assets/css'))
})

gulp.task('build', function(callback) {
    runSequence('sass', callback)
  })