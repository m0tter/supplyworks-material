var gulp    = require('gulp');
var del     = require('del');
var jade    = require('gulp-jade');
var ts      = require('gulp-typescript');

var tsProject = ts.createProject('./tsconfig.json');

gulp.task('clean.all', function() {
  return del.sync(['./dist']);
});

gulp.task('clean.client', function() {
  return del.sync(['./dist/client']);
});

gulp.task('clean.server', function() {
  return del.sync(['./dist/server']);
});

gulp.task('jade.compile', function() {
  return gulp.src('./src/client/**/*.jade')
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('./dist/client'));
});

gulp.task('ts.compile', function() {
  var tsResult = tsProject.src()
    .pipe(tsProject());

  return tsResult.js.pipe(gulp.dest('./dist'));  
});

gulp.task('copy.nodemodules', function() {
  gulp.src('./node_modules/**/*')
    .pipe(gulp.dest('./dist/node_modules'));
})

gulp.task('watch', ['ts.compile', 'jade.compile'], function() {
  gulp.watch('src/**/*.ts', ['ts.compile']);
  gulp.watch('src/client/**/*.jade', ['jade.compile']);
})

gulp.task('build.dist', ['clean.all', 'copy.nodemodules', 'ts.compile', 'jade.compile']);