var gulp    = require('gulp');
var del     = require('del');
var jade    = require('gulp-jade');
var ts      = require('gulp-typescript');

var tsProject = ts.createProject('./tsconfig.json');
var node;
var mongod;
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;

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
    .pipe(gulp.dest('dist/node_modules'));
});

gulp.task('copy.clientmodules', function() {
  return gulp.src('src/client/node_modules/**/*')
    .pipe(gulp.dest('dist/client/node_modules'));
});

gulp.task('copy.css', function() {
  return gulp.src('src/client/**/*.css')
    .pipe(gulp.dest('dist/client'));
})

gulp.task('node.start', function() {
  if(node) node.kill();
  node = spawn('node', ['dist/server.js'], {stdio: 'inherit'})
  node.on('close', function(code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

gulp.task('mongod.start', function(cb) {
  mongod = exec('mongod --dbpath ./data', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb();
  });
});

gulp.task('serve', ['ts.compile', 'jade.compile', 'node.start', 'copy.css'], function() {
  gulp.watch('src/**/*.ts', {cwd: './'}, ['ts.compile']);
  gulp.watch('src/client/**/*.jade', {cwd: './'}, ['jade.compile']);
  gulp.watch('src/client/**/*.css', {cwd: './'}, ['copy.css']);
  gulp.watch(['dist/server.js', 'dist/server/**/*.js'], {cwd: './'}, ['node.start']);
});

gulp.task('build.dist', ['clean.all', 'copy.servermodules', 'copy.clientmodules', 'ts.compile', 'jade.compile']);