app.controller('loginCtrl', ['$scope', 'svLogin', '$location', '$localStorage', function ($scope, svLogin, $location, $localStorage) {
	$scope.isAuthenticated = function () {
		if ($localStorage.user)
			$scope.username = $localStorage.user[0].Username;
		return $localStorage.user[0];
	}
	$scope.login = function () {
		var data = {
			Username: $scope.login_name,
			Password: $scope.login_pass
		}
		svLogin.login(data)
			.then(function successCallback(res) {
				if (res.data == -1) {
					alert("Mật Khẩu Không Hợp Lệ");
					$scope.login_name = '';
					$scope.login_pass = '';
				}
				else {
					$localStorage.user = res.data;
					$location.path("/dashboard");
				}
			}, function errorCallback(res) {
				console.log(res.status)
			})
	}
	$scope.logout = function () {
		$localStorage.user = '';
		$location.path("/login");
		$scope.dropdownLogin = false;
		$scope.username = '';
	}
}])