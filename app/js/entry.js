const angular = require('angular');
const hueApp = angular.module('hueApp', [require('angular-route')]);

require('./controllers')(hueApp);
// require('./directives')(hueApp);
// require('./services')(hueApp);

hueApp.config(['$routeProvider', function($routing) {
  $routing
    .when('/dashboard', {
      templateUrl: 'templates/views/dashboard_view.html'
    })
    .when('/bridge', {
      templateUrl: 'templates/views/bridge_view.html'
    })
    .when('/group', {
      templateUrl: 'templates/views/group_view.html'
    })
    .when('/all', {
      templateUrl: 'templates/views/all_lights_view.html'
    })
    .when('/light', {
      templateUrl: 'templates/views/light_view.html'
    })
    .when('/signup', {
      templateUrl: 'templates/views/auth/auth_view.html',
      controller: 'SignUpController',
      controllerAs: 'authCtrl'
    })
    .when('/login', {
      templateUrl: 'templates/views/auth/auth_view.html'
    })
    .otherwise({
      redirectTo: '/signup'
    });
}]);
