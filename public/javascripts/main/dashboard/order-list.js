app.controller('orderListCtrl', ['$scope', '$rootScope', 'svOrderList', 'Notification', '$state', '$window', '$localStorage', function ($scope, $rootScope, svOrderList, Notification, $state, $window, $localStorage) {
	if ($scope.orders)
		$scope.totalItems = $scope.orders.length;
	else
		$scope.orders = [];

	$scope.itemsPerPage = 10;

	var temp = [];
	$scope.parsePage = function (arraySrc, arrayDes, length) {
		var temp = arraySrc.slice(0, arraySrc.length);
		for (var i = 0; i < length / $scope.itemsPerPage; i++) {
			arrayDes.push(temp.splice(0, $scope.itemsPerPage))
		}
	}
	$rootScope.formatCrrentcy = function (number) {
		if (number === undefined || number == '')
			return;
		var price = parseFloat(number);
		return price.toFixed(0).replace(/./g, function (c, i, a) {
			return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
		});
	}
	function filterItems(query, array) {
		return array.filter(function (el) {
			return el.status.toLowerCase().indexOf(query.toLowerCase()) > -1;
		})
	}
	$scope.filterStatus = function (status) {
		var buff = filterItems(status, $scope.orders);
		temp = [];
		$scope.totalItems = buff.length;
		$scope.parsePage(buff, temp, buff.length);
		$scope.ordersCurrent = temp[$scope.currentPage - 1];
	}
	$scope.currentPage = 1;
	$scope.parsePage($scope.orders, temp, $scope.orders.length);
	$scope.ordersCurrent = temp[0];

	function addZero(i) {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}
	$rootScope.formatSecToDate = function (sec) {
		var curdate = new Date(null);
		curdate.setTime(sec);
		return curdate.getDate() + '/' + curdate.getMonth() + '/' + curdate.getFullYear() + ' ' + curdate.getHours()
			+ ':' + curdate.getMinutes() + ':' + addZero(curdate.getSeconds());
	}

	$scope.setPage = function (pageNo) {
		$scope.currentPage = pageNo;
		$scope.ordersCurrent = temp[$scope.currentPage - 1];

	};
	$scope.approveOrder = function (order) {
		svOrderList.approveOrder(order.poNumber, $localStorage.employee)
			.then(function successCallback(res) {
				Notification({ message: `Xác nhận đơn hàng thành công`, title: 'Thông báo', delay: 2000 });
				$state.reload();
			}, function errorCallback(res) {
				console.log(res.status);
			})
	}
	$scope.back = function () {
		$window.history.back();
	}
	$scope.updateOrder = function () {
		svOrderList.updateOrder($rootScope.order).then(
			function successCallback(res) {
				Notification({ message: `Update đơn hàng thành công`, title: 'Thông báo', delay: 2000 });
				$state.go('order-list');
			},
			function errorCallback(res) {
				console.log(res.status);
			}
		)
	}
}])