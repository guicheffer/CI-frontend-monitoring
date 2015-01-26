var gulp = require( 'gulp' ) ,
	uglify = require( 'gulp-uglify' ) ;

gulp.task( 'uglify', function() {
  gulp.src( './static/js/*.js' )
        .pipe( uglify() )
        .pipe( gulp.dest('./static/js/common.min.js') ) ;
} ) ;

gulp.task( 'watch', function() {
	gulp.watch( './static/js/common.js', ['uglify'] )
} ) ;