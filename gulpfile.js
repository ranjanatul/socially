const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const mincss = require('gulp-clean-css');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
// latest version doesn't support commonJS syntax. either use lower version or write using import del from 'del'
const del = require('del');

gulp.task('css', function (done) {
  console.log('minifying css...');
  gulp
    .src('./assets/**/*.css')
    .pipe(mincss())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(
      rev.manifest({
        cwd: 'public',
        merge: true,
      })
    )
    .pipe(gulp.dest('./public/assets'));
  done();
});

gulp.task('js', function (done) {
  console.log('minifying js..');
  gulp
    .src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(
      rev.manifest({
        cwd: 'public',
        merge: true,
      })
    )
    .pipe(gulp.dest('./public/assets'));
  done();
});

gulp.task('imagemin', function (done) {
  gulp
    .src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(
      rev.manifest({
        cwd: 'public',
        merge: true,
      })
    )
    .pipe(gulp.dest('./public/assets'));
  done();
});

gulp.task('clean:assets', function (done) {
  del.sync(['./public/assets'], { force: true });
  done();
});

gulp.task(
  'build',
  gulp.series('clean:assets', 'css', 'js', 'imagemin'),
  function (done) {
    console.log('buliding assets');
    done();
  }
);
