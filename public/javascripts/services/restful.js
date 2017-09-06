var app = angular.module("app");
app.factory("svLogin", ['$http', function ($http) {
	return {
		getInfo: function () {
			return $http.get('/login/');
		},
		login: function (data) {
			return $http.post('/login/', data);
		},
		changePassword: function (data) {
			return $http.put('/login/', data);
		}
	}
}]);