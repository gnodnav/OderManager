app.config(function ($mdThemingProvider) {
	$mdThemingProvider.theme('blue')
		.primaryPalette('blue');

}).controller('popupCtrl', function ($scope, $mdDialog, $interval) {
	$scope.theme = 'blue';
	$scope.showAdvanced = function (ev, url) {
		$mdDialog.show({
			controller: DialogController,
			templateUrl: url,
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: true
		})
			.then(function (answer) {
				$scope.status = 'You said the information was "' + answer + '".';
			}, function () {
				$scope.status = 'You cancelled the dialog.';
			});
	};
	function DialogController($scope, $mdDialog) {
		$scope.hide = function () {
			$mdDialog.hide();
		};

		$scope.cancel = function () {
			$mdDialog.cancel();
		};

		$scope.answer = function (answer) {
			$mdDialog.hide(answer);
		};
	}
	$scope.infoTable = true;
	$scope.editInfo = function () {
		$scope.infoTable = !$scope.infoTable;
	}
	$scope.setFile = function (element) {
		$scope.$apply(function ($scope) {
			$scope.theFile = element.files[0];
			$scope.fileName = $scope.theFile.name;
		});
	};
});