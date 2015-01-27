var gulp = require( 'gulp' ) ,
	/*path = require( 'path' ),*/
	rename = require( 'gulp-rename' ),
  uglify = require( 'gulp-uglify' ),
	compass = require( 'gulp-compass' )
  cssmin = require( 'gulp-cssmin' ) ;


gulp.task( 'compass' , function() {
  gulp.src( './static/css/base.scss' )
    .pipe( compass( {
      config_file: './config.rb',
      css: 'static/css',
      sass: 'static/css'
    } ) )
    .pipe( cssmin() )
    .pipe( rename( 'base.min.css' ) )
    .pipe( gulp.dest( './static/css/' ) ) ;
});

gulp.task( 'uglify', function() {
  gulp.src( './static/js/common.js' )
    .pipe( uglify() )
		.pipe( rename( 'common.min.js' ) )
    .pipe( gulp.dest( './static/js/' ) ) ;
} ) ;

gulp.task( 'watch', function() {
	gulp.watch( './static/js/common.js', ['uglify'] ) ;
  gulp.watch( './static/css/base.scss', ['compass'] ) ;
} ) ;