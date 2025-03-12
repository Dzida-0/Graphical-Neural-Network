const gulp = require('gulp');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');

gulp.task('less', function () {
    return gulp.src('src/styles/main.less') 
        .pipe(less())
        .pipe(cleanCSS()) 
        .pipe(gulp.dest('src/styles/')); 
});

gulp.task('watch', function () {
    gulp.watch('src/styles/*.less', gulp.series('less'));
});

gulp.task('default', gulp.series('less', 'watch'));
