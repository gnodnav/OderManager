//pagination
$scope.totalItems = 20;
$scope.currentPage = 4;

$scope.setPage = function (pageNo) {
	$scope.currentPage = pageNo;
};

$scope.pageChanged = function () {
	$log.log('Page changed to: ' + $scope.currentPage);
};

$scope.maxSize = 5;
$scope.bigTotalItems = 80;
$scope.bigCurrentPage = 1;