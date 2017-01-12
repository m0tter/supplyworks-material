var gulp    = require('gulp');
var del     = require('del');
var jade    = require('gulp-jade');
var ts      = require('gulp-typescript');

var tsProject = ts.createProject('./tsconfig.json');

gulp.task('clean.all', function(cb) {
  del.sync(['./dist']);
  cb();
});

gulp.task('clean.client', function() {
  return del(['./dist/client']);
});

gulp.task('clean.server', function() {
  return del(['./dist/server']);
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

gulp.task('copy.servermodules', function() {
  return gulp.src('src/server/node_modules/**/*')
    .pipe(gulp.dest('dist/server/node_modules'));
});

gulp.task('copy.clientmodules', function() {
  return gulp.src('src/client/node_modules/**/*')
    .pipe(gulp.dest('dist/client/node_modules'));
  
});

gulp.task('watch', ['ts.compile', 'jade.compile'], function() {
  gulp.watch('src/**/*.ts', {cwd: './'}, ['ts.compile']);
  gulp.watch('src/client/**/*.jade', {cwd: './'}, ['jade.compile']);
})

gulp.task('build.dist', ['clean.all', 'copy.servermodules', 'copy.clientmodules', 'ts.compile', 'jade.compile']);