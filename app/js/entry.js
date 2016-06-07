const angular = require('angular');
const hueApp = angular.module('hueApp', [require('angular-route')]);

require('./controllers')(hueApp);
require('./directives')(hueApp);
require('./services')(hueApp);

hueApp.config(['$routeProvider', function($routing) {
  $routing
    .when('/dashboard', {
      templateUrl: 'templates/views/dashboard_view.html',
      controller: 'DashboardController',
      controllerAs: 'dashCtrl'
    })
    .when('/bridge', {
      templateUrl: 'templates/views/bridge_view.html',
      controller: 'BridgeController',
      controllerAs: 'bridgeCtrl'
    })
    .when('/group', {
      templateUrl: 'templates/views/group_view.html',
      controller: 'GroupController',
      controllerAs: 'groupCtrl'
      // TODO: Create a route and view for the group/thisgroupnamething
    })
    .when('/all', {
      templateUrl: 'templates/views/all_lights_view.html',
      controller: 'AllLightsController',
      controllerAs: 'allCtrl'
    })
    .when('/light/:id', {
      templateUrl: 'templates/views/light_view.html',
      controller: 'LightController',
      controllerAs: 'lightCtrl'
    })
    .when('/logout', {
      templateUrl: 'templates/views/auth/logout_view.html',
      controller: 'LogoutController',
      controllerAs: 'authCtrl'
    })
    .when('/signup', {
      templateUrl: 'templates/views/auth/auth_view.html',
      controller: 'SignUpController',
      controllerAs: 'authCtrl'
    })
    .when('/login', {
      templateUrl: 'templates/views/auth/auth_view.html',
      controller: 'LoginController',
      controllerAs: 'authCtrl'
    })
    .otherwise({
      redirectTo: '/signup'
    });
}]);
