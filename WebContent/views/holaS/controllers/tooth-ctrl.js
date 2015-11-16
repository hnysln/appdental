'use strict';

var myApp = angular.module('myApp', [ 'nvd3' ]);

myApp.controller('myCtrl', [ '$scope', function($scope) {
	$scope.greeting = 'Hola!';
	$scope.quantityA = 0;
	$scope.quantityB = 0;
	$scope.quantityC = 0;

	$scope.options = {
		chart : {
			type : 'discreteBarChart',
			height : 130,
			width : 100,
			margin : {
				top : 50,
				right : 0,
				bottom : 0,
				left : 60
			},
			x : function(d) {
				return d.label;
			},
			y : function(d) {
				return d.value;
			},
			showValues : true,
			valueFormat : function(d) {
				return d;
			},
			transitionDuration : 500,
			xAxis : {
				axisLabel : 'X Axis'
			},
			yAxis : {
				axisLabel : 'Y Axis',
				axisLabelDistance : -10
			},

		/*
		 * , yDomain : [-15, 15], staggerLabels : true
		 */
		// yRange : ["red","green"]
		}
	};

	$scope.dataChart = [ {
		key : "Cumulative Return",
		values : [ {
			"label" : "A",
			"value" : $scope.quantityA
		}, {
			"label" : "B",
			"value" : $scope.quantityB
		}, {
			"label" : "C",
			"value" : $scope.quantityC
		} ]
	} ];

	$scope.initData = function() {
		$scope.chart = nv.models.discreteBarChart().x(function(d) {
			return d.label
		}) // Specify the data accessors.
		.y(function(d) {
			return d.value
		}).staggerLabels(true) // Too many bars and not enough room? Try
								// staggering labels.
		.tooltips(false) // Don't show tooltips
		.showValues(true) // ...instead, show the bar value right on top of
							// each bar.
		.transitionDuration(500).xAxis({
			axisLabel : 'X Axis'
		}).yAxis({
			axisLabel : 'Y Axis',
			axisLabelDistance : -10
		}).yScale({
			domain : [ -15, 15 ]
		});
	}

	$scope.onChangeQuantity = function() {
		console.log("initData " + $scope.greeting);

		$scope.dataChart = [ {
			key : "Cumulative Return",
			values : [ {
				"label" : "A",
				"value" : $scope.quantityA
			}, {
				"label" : "B",
				"value" : $scope.quantityB
			}, {
				"label" : "C",
				"value" : $scope.quantityC
			} ]
		} ];

		var data = d3.select('#tooth_div svg').datum($scope.dataChart);
		if (angular.isUndefined(data)) {
			data.call($scope.chart);
		}

		/*if (angular.isUndefined($scope.chart)) {
			nv.utils.windowResize($scope.chart.update);
		}*/
	}

	// $scope.uploadFile().then(console.log("upload finished"));

} ]);