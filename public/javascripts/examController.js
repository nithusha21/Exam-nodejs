var app = angular.module('examApp', [], function($locationProvider) {
  $locationProvider.html5Mode(true);
});

app.controller('testController', ['$location', '$http', '$scope', function($location, $http, $scope){
	var params = $location.search();
	this.params = params;
	var user = params["user"];
	this.data = {};
  var data = $http.get('/users/'+user).then(function(response){
		console.log(response.data);
		this.data = response.data;
		return response.data;
	});
}]);
app.controller('questionController', ['$http', function($http){
	//$http.get('/exam').success()
}]);
