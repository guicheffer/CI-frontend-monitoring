var gulp = require( 'gulp' ) ,
	rename = require( 'gulp-rename' ),
  uglify = require( 'gulp-uglify' ),
	compass = require( 'gulp-compass' ),
  minifyCSS = require( 'gulp-minify-css' ),
  cssmin = require( 'gulp-cssmin' ) ;


gulp.task( 'compass' , function() {
  gulp.src( './static/css/base.scss' )
    /*.pipe( minifyCSS( { keepSpecialComments : '*' } ) )*/
    .pipe( compass( {
      config_file: './config.rb',
      css: 'static/css',
      sass: 'static/css'
    } ) )
    /*.pipe( rename( 'base.min.css' ) )*/
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