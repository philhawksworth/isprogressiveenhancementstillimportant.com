var gulp = require('gulp');
var shell = require('gulp-shell');
var connect = require('gulp-connect');

gulp.task('build', function() {
  // Usually we would minify and concatenate, but on this project
  // we'll just throw everything into the dist folder
  return gulp.src(["src/*", "CNAME"])
    .pipe(gulp.dest('dist'));
});

// run a local server
gulp.task('serve', function() {
  connect.server({
	root: 'dist',
	port: 8000,
  });
});


// deploy by pushing the dist subtree to gh-pages
gulp.task('deploy', ['build'], shell.task([
  'git subtree push --prefix dist origin gh-pages'
]));

// The default task builds locally, and serves it up.
gulp.task('default', ['build', 'serve']);


