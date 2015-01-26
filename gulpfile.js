var gulp = require( 'gulp' ) ,
	/*path = require( 'path' ),*/
	rename = require( 'gulp-rename' ),
	uglify = require( 'gulp-uglify' ),
	compass = require( 'gulp-compass' ) ;

gulp.task( 'uglify', function() {
  gulp.src( './static/js/common.js' )
        .pipe( uglify() )
		.pipe( rename( 'common.min.js' ) )
        .pipe( gulp.dest( './static/js/' ) ) ;
} ) ;

gulp.task( 'compass' , function() {
  gulp.src( './static/css/*.scss' )
    .pipe( compass( {
      config_file: './config.rb',
      css: 'static/css',
      sass: 'static/css'
    } ) )
    .pipe( gulp.dest( './static/css/' ) );
});

gulp.task( 'watch', function() {
	gulp.watch( './static/js/common.js', ['uglify'] ) ;
	gulp.watch( './static/js/base.scss', ['compass'] ) ;
} ) ;