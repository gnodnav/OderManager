var app = angular.module('app', ['ui-notification', 'ngRoute', 'ui.router', "ui.bootstrap", 'ngMaterial', 'ngStorage', 'angularFileUpload']);
app.config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/login');
	$stateProvider
		//========================================
		.state('login', {
			url: '/login',
			templateUrl: '/views/login.html',
			controller: 'loginCtrl',
			onEnter: function ($state, $localStorage, $rootScope) {
				if ($localStorage.user) {
					$state.transitionTo('homepage');
				}

			}

		})
		//routing for dashboard
		.state('dashboard', {
			url: '/dashboard',
			templateUrl: '/views/body/dashboard.html',
			onEnter: function ($state, $localStorage, $rootScope) {
				if ($localStorage.employee.authorities == 'Administrator') {
					$rootScope.employees = true;
					$rootScope.customers = true;
				}
				else {
					$rootScope.employees = false;
					$rootScope.customers = false;
				}

			}


		})
		.state('homepage', {
			parent: 'dashboard',
			url: '/homepage',
			views: {
				'viewHomePage': {
					templateUrl: '/views/dashboard/homepage.html'
				},
			}
		})
		.state('order', {
			parent: 'dashboard',
			url: '/order',
			views: {
				'contentView': {
					templateUrl: '/views/dashboard/order.html',
					controller: 'orderCtrl'
				},
			},
			resolve: {
				getCustomers: function ($rootScope, svOrderList) {
					return svOrderList.getCustomers()
						.then(function successCallbac(res) {
							$rootScope.states = res.data;
						}, function errorCallbac(res) {
							console.log(res.status);
						})
				}
			}
		})
		.state('order-list', {
			parent: 'dashboard',
			url: '/order-list',
			views: {
				'contentView': {
					templateUrl: '/views/dashboard/order-list/orderlist.html',
					controller: 'orderListCtrl'
				},
			},
			resolve: {
				getOrders: function ($rootScope, svOrderList, $localStorage) {
					return svOrderList.getOrders($localStorage.user[0].EmplID, $localStorage.employee.ChildDepartment)
						.then(function successCallback(res) {
							$rootScope.orders = res.data.data;
							return res.data.data;
						}, function errorCallback(res) {
							console.log(res.status);
						})
				}
			},
			onEnter: function ($rootScope, $state, $localStorage) {
				//	console.log($localStorage.employee.authorities);
				if ($localStorage.employee.authorities == 'Manager' || $localStorage.employee.authorities == 'Administrator') {
					$rootScope.btnApprove = true;
				} else
					$rootScope.btnApprove = false;

				if ($localStorage.employee.authorities == 'POM') {
					$rootScope.pomViewApprove = true;
				} else
					$rootScope.pomViewApprove = false;
				if ($localStorage.employee.authorities == 'AM') {
					$rootScope.idViewAM = false;
				} else
					$rootScope.idViewAM = true;
			},
		})
		.state('order-list-id', {
			parent: 'dashboard',
			url: '/order-list/:idPonumber',
			views: {
				'contentView': {
					templateUrl: '/views/dashboard/order-list/vieworder.html',
					controller: 'orderListCtrl'
				},
			},
			resolve: {
				getOrder: function ($rootScope, svOrderList, $stateParams) {
					return svOrderList.getOrder($stateParams.idPonumber)
						.then(function successCallback(res) {
							$rootScope.order = res.data.data;
							return res.data.data;
						}, function errorCallback(res) {
							console.log(res.status);
						})
				}
			},
			onEnter: function ($rootScope, $state, $localStorage) {
				if ($localStorage.employee.authorities == 'POM' || $localStorage.employee.authorities == "Administrator") {
					$rootScope.orderId = 'edit';
				} else
					$rootScope.orderId = 'unEdit';
			}


		})
		.state('user-info', {
			parent: 'dashboard',
			url: '/user-info',
			views: {
				'contentView': {
					templateUrl: '/views/dashboard/user-info/info.html',
					controller: 'loginCtrl'
				}
			},
			resolve: {
				getInfoEmployee: function ($rootScope, svEmployee, $localStorage) {
					return svEmployee.getInfo($localStorage.user[0].EmplID)
						.then(function successCallbac(res) {
							$rootScope.employee = res.data[0];
							$localStorage.employee = res.data[0];
							return res.data;
						}, function errorCallbac(res) {
							console.log(res.status);
						})
				}
			}
		})
		.state('change-password', {
			parent: 'dashboard',
			url: '/change-password',
			views: {
				'contentView': {
					templateUrl: '/views/dashboard/user-info/changepassword.html',
					controller: 'loginCtrl'
				},
			}
		})
		.state('employees', {
			parent: 'dashboard',
			url: '/employees',
			views: {
				'viewEmployees': {
					templateUrl: '/views/dashboard/employees.html',
					controller: 'employeesCtrl'
				},
			},
			onEnter: function ($localStorage) {
				delete $localStorage.opitionFilterEmpl;
			}
		})
		.state('customers', {
			parent: 'dashboard',
			url: '/customers',
			views: {
				'viewEmployees': {
					templateUrl: '/views/dashboard/customers.html',
					controller: 'customersCtrl'
				},
			},
			onEnter: function ($localStorage) {
				delete $localStorage.optionFilterCustomer;
			}
		})
});
app.config(function (NotificationProvider) {
	NotificationProvider.setOptions({
		delay: 10000,
		startTop: 5,
		startRight: 10,
		verticalSpacing: 20,
		horizontalSpacing: 20,
		positionX: 'right',
		positionY: 'top',
	});
})
// app.run(function ($http) {

// });
app.run(function ($localStorage, $transitions, $location, $state, $http) {
	$http.defaults.headers.common.Authorization = $localStorage.employee.authorities;
	$transitions.onBefore({
		to: function (state) {
			return state.name !== 'login';
		}
	}, function (trans) {
		if ($localStorage.user)
			return true;
		else
			return trans.router.stateService.target('login');

	});
	$transitions.onError({}, function (trans) {

		console.log(trans._error);
		console.log(trans._error.type);
		if (trans._error.type === 5)
			$state.reload();

	})

})