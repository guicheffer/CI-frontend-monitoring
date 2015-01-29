'use strict';

/**
 * Jobvite Assignment
 * http://tests.guiatech.com.br/jobvite-assignment/
 * Copyright 2015, Guia Tech
 * Author: João Guilherme C. Prado
 * Library: jQuery 2.1.1
 * 
 * Built with Angular and Polish of UX experience and adherence to spec, Cleanliness, simplicity of code / stubs aiming status of builds and firewalls.
 *
 * Date: Mon Jan 26 2015 13:33:09 GMT-0300
 */


//declaring main variable for all
var jobviteservers = angular.module ( "jobviteservers", [] ), servers = {} ;


/*ANGULAR FUNCTIONS*/
jobviteservers.controller( 'showListBuildFirewall' , [ '$scope', '$http', function( $scope, $http ) {

	$http.get( 'static/js/list.json' )
		.then( function( res ) {
			$scope.list = res.data ;
		} ) ;

	$scope.set_item = function ( $event ) {
		var current_item = $( $event.currentTarget ) ;

		$( '.item.open' , servers.configs.list_servers ).each( function() {
			if( $( this ).data( 'id-control' ) != current_item.data( 'id-control' ) ){
				$( this ).removeClass( 'open' ) ;
			}
		} ) ;

		//set in current one
		current_item.toggleClass( 'open' ) ;
	}
} ] ) ;
/*/ANGULAR FUNCTIONS*/


//server configs
servers.configs = {

	container: '.container',

	list_servers: '.list-servers',

	init: function() {
		var that = this, container = $( that.container ), items = $( '.item' , that.list_servers ) ;

		//...
	}
} ;



//ready function
$( function(){
	//servers.configs.init() ;
}) ;