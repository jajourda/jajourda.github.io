'use strict';
var ser = angular.module('jajourda.services',[]);
ser.factory('CvData', function($http) {
	var promise;
	var CvData = {
		async: function() {
			if (!promise) {
				promise = $http({
					method: 'GET',
					url: 'src/CvData.json',
					headers: {
						'Content-Type': 'application/json'
					}
				});
			}
			// Return the promise to the controller
			return promise;
		}
	};
	return CvData;
});

ser.factory('WebDevData', function($http) {
	var promise;
	var WebDevData = {
		async: function() {
			if (!promise) {
				promise = $http({
					method: 'GET',
					url: 'src/WebDevData.json',
					headers: {
						'Content-Type': 'application/json'
					}
				});
			}
			// Return the promise to the controller
			return promise;
		}
	};
	return WebDevData;
});