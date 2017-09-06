var app = angular.module('app', ['ngRoute', 'ui.router', "ui.bootstrap", 'ngMaterial','ngStorage']);
app.config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/login');
	$stateProvider
		//========================================
		.state('login', {
			url: '/login',
			templateUrl: '/views/login.html',
			controller: 'loginCtrl',
			onEnter: function ($state,$localStorage) {
				if ($localStorage.user)
					$state.transitionTo('dashboard');	
			}
		})
		//routing for dashboard
		.state('dashboard', {
			url: '/dashboard',
			templateUrl: '/views/body/dashboard.html',
			redirectTo : 'order'
		})
		.state('order', {
			parent: 'dashboard',
			url: '/order',
			views: {
				'contentView': {
					templateUrl: '/views/body/order.html',
					controller: 'loginCtrl'
				},
			}
		})
		.state('order-list', {
			parent: 'dashboard',
			url: '/order-list',
			views: {
				'contentView': {
					templateUrl: '/views/dashboard/order-list/orderlist.html',
					controller: 'loginCtrl'
				},
			}
		})
		.state('user-info', {
			parent: 'dashboard',
			url: '/user-info',
			views: {
				'contentView': {
					templateUrl: '/views/dashboard/user-info/info.html',
					controller: 'loginCtrl'
				},
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
		.state('notification', {
			parent: 'dashboard',
			url: '/notification',
			views: {
				'contentView': {
					templateUrl: '/views/dashboard/notification.html',
					controller: 'loginCtrl'
				},
			}
		})
		//routing for admin
		// .state('admin', {
		// 	url: '/admin',
		// 	templateUrl: '/views/body/admin.html',
		// 	controller: 'loginCtrl'
		// })
		// .state('notification-ad', {
		// 	parent: 'admin',
		// 	url: '/notification',
		// 	views: {
		// 		'contentView': {
		// 			templateUrl: '/views/admin/notification.html',
		// 			controller: 'loginCtrl'
		// 		},
		// 	}
		// })
		// .state('order-list-ad', {
		// 	parent: 'admin',
		// 	url: '/order-list',
		// 	views: {
		// 		'contentView': {
		// 			templateUrl: '/views/admin/order-list/orderlist.html',
		// 			controller: 'loginCtrl'
		// 		},
		// 	}
		// })
		// .state('user-info-ad', {
		// 	parent: 'admin',
		// 	url: '/user-info',
		// 	views: {
		// 		'contentView': {
		// 			templateUrl: '/views/admin/user-info/info.html',
		// 			controller: 'loginCtrl'
		// 		},
		// 	}
		// })
		// .state('change-password-ad', {
		// 	parent: 'admin',
		// 	url: '/change-password',
		// 	views: {
		// 		'contentView': {
		// 			templateUrl: '/views/admin/user-info/changepassword.html',
		// 			controller: 'loginCtrl'
		// 		},
		// 	}
		// })
});
app.run(function ($localStorage, $transitions,$location, $state) {
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

	$transitions.onError({},function(trans) {

		console.log(trans._error);
		if (trans._error.type === 5)
			$state.reload();

	})

})