'use strict';

/**
 * Jobvite Assignment
 * http://tests.guiatech.com.br/ci-monitoring/
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


//SERVER > CONFIGS
servers.configs = {
	container: '.container',
	content: '.container > .content',
	list_servers: '.list-servers',
	json_data: 'random_data.php',
	chart_options: {
		scaleShowLabelBackdrop: true,
		scaleBackdropColor: "rgba(255,255,255,0.75)",
		scaleBeginAtZero: true,
		scaleBackdropPaddingY: 2,
		scaleBackdropPaddingX: 2,
		scaleShowLine: true,
		segmentShowStroke: true,
		segmentStrokeColor: "#fff",
		segmentStrokeWidth: 1,
		animationSteps: 100,
		animationEasing: "easeOutBounce",
		animateRotate: true,
		animateScale: false
    },
    init: function() {
    	var that = this, gif_loading = $( '.gif-loading', that.container ), btn_refresh = $( '.btn-refresh', that.container ) ;

    	//set it (img_loading)
    	gif_loading.css( 'left', ( ( $( window ).width() / 2 ) - ( gif_loading.width() / 2 ) ) ) ;
    	gif_loading.css( 'top', ( ( $( window ).height() / 2 ) - ( gif_loading.height() + 100 ) ) ) ;
    }
} ;


/*ANGULAR FUNCTIONS*/
jobviteservers.controller( 'showListBuildFirewall' , [ '$scope', '$http', function( $scope, $http ) {


	//get random data
	$http.get( servers.configs.json_data )
		.then( function( res ) {
			$scope.list = res.data ;
		} ) ;


	$scope.set_item = function ( $event ) {
		var current_item = $( $event.currentTarget ),
		target_clicked = $( $event.target ) ;

		$( '.item.open' , servers.configs.list_servers ).each( function() {
			if( $( this ).data( 'id-control' ) != current_item.data( 'id-control' ) ){
				$( this ).removeClass( 'open' ) ;
			}
		} ) ;

		//set in current one
		if( ! target_clicked.hasClass( 'prevent-default' ) ){
			current_item.toggleClass( 'open' ) ;
		}
	}



	$scope.refresh_list = function( $event ) {
		//taking loading class out
		$( servers.configs.content ).toggleClass( 'loading' ) ;

		//clearing elements
		$( '.list-servers li.item', servers.configs.content ).html( '' ) ;

		//set new random data after pressing refresh button
		$http.get( servers.configs.json_data )
			.then( function( res ) {
				$scope.list = res.data ;
			} ) ;
	}


	//finished ng-repeat
	$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
		var name_pie = '.unit-pie' ;

		//execute after ng-repeat finished function
	    $( '.box-unit .chart .org-pie,
	    	.box-functional .chart .org-pie', servers.configs.list_servers ).each( function( i ) {
	    	var unit_chart = $( this ),
	    	ctx = unit_chart.get( 0 ).getContext( "2d" ),
	    	code_covered_v = parseInt( unit_chart.data( 'code-covered' ) ),
	    	code_not_covered_v = parseInt( unit_chart.data( 'code-not-covered' ) ),
			data = [
				{
					value: code_covered_v,
					color: "#70AD47",
					highlight: "#70AD47",
					label: "value"
				},
				{
					value: code_not_covered_v,
					color: "#EC7C30",
					highlight: "#EC7C30",
					label: "value"
				}
			],
			unit_chart_mount = new Chart(ctx).Pie( data, servers.configs.chart_options ) ;
	    } ) ;

	    //set loading class
	    $( servers.configs.content ).toggleClass( 'loading' ) ;
	});

} ] ).directive( 'onFinishRender', [ '$timeout', function ( $timeout ) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                } ) ;
            }
        }
    }
} ] ) ;
/*/ANGULAR FUNCTIONS*/


//DOCUMENT [READY]
$( function() {
	//set position img loading (gif_loading) [centralize it]
	servers.configs.init() ;
} ) ;
