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
			]

			var unit_chart_mount = new Chart(ctx).Pie( data, servers.configs.options ) ;

	    } ) ;
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


//server configs
servers.configs = {
	container: '.container',
	list_servers: '.list-servers',
	options: {
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
		animateScale: false,
		legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
    }
} ;