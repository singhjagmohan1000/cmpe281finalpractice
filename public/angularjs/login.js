//loading the 'login' angularJS module
var login = angular.module('login', []);
//defining the login controller
login.controller('login', function($scope, $http) {
	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false
	$scope.invalid_login = true;
	$scope.unexpected_error = true;
	$scope.invalid_signup=true;
	$scope.unexpected_error_signing=true;
	$scope.valid_signup=true;
	
	$scope.login = function() {
		var data={"username":$scope.username,"password":$scope.password};
		var sdata=angular.toJson(data);
		$http({
			method : 'POST',
			url : '/checklogin',
			data : sdata
		}).then(function(response) {
			//checking the response data for statusCode
			if (response.data.statusCode == 401) {
				$scope.invalid_login = false;
				$scope.unexpected_error = true;
			}
			else
				//Making a get call to the '/redirectToHomepage' API
				window.location.assign("/homepage"); 
		},function(response) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
		});
	};
	$scope.signUp = function() {
		$http({
			method : "POST",
			url : '/signUp',
			data : {
				"firstname" : $scope.firstname,
				"lastname" : $scope.lastname,
				"user" : $scope.user,
				"pass" : $scope.pass
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 401) {
				$scope.invalid_signup = false;
				$scope.unexpected_error_signing = true;
			}
			else
				//Making a get call to the '/redirectToHomepage' API
				$scope.valid_signup = false;
		}).error(function(error) {
			$scope.unexpected_error_signing = false;
			$scope.invalid_signup = true;
		});
	};
})
