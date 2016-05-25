//loading the 'login' angularJS module
var login = angular.module('login', []);
//defining the login controller
login.controller('login', function($scope, $http) {
	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false
	$scope.invalid_login = true;
	$scope.unexpected_error = true;

		$http({
			method : "GET",
			url : '/hello',

		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 401) {
				$scope.invalid_login = false;
				$scope.unexpected_error = true;
			}
			else
			{
				$scope.server1=data.server;
				$scope.value1=data.hello;
				console.log($scope.server1);
			}
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
		});

	$http({
		method : "GET",
		url : '/hello1',

	}).success(function(data) {
		//checking the response data for statusCode
		if (data.statusCode == 401) {
			$scope.invalid_login = false;
			$scope.unexpected_error = true;
		}
		else
		{
			$scope.server2=data.server;
			$scope.value2=data.hello;
			console.log($scope.server2);
		}
	}).error(function(error) {
		$scope.unexpected_error = false;
		$scope.invalid_login = true;
	});

	$http({
		method : "GET",
		url : '/hello2',

	}).success(function(data) {
		//checking the response data for statusCode
		if (data.statusCode == 401) {
			$scope.invalid_login = false;
			$scope.unexpected_error = true;
		}
		else
		{
			$scope.server3=data.server;
			$scope.value3=data.hello;
			console.log($scope.server3);
		}
	}).error(function(error) {
		$scope.unexpected_error = false;
		$scope.invalid_login = true;
	});


})
