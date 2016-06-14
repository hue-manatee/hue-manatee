const angular = require('angular');
const hueApp = angular.module('hueApp', [require('angular-route')]);

require('./controllers')(hueApp);
require('./directives')(hueApp);
require('./services')(hueApp);

/* when you have this man routes you might consider moving them to 
   other files, you can still do an app.config from those other files.
   group them like you would server side routes and pull them into here and
   create the default/fallback routes.
*/

hueApp.config(['$routeProvider', function($routing) {
  $routing
//get rid of this blank line
    .when('/', {
      templateUrl: 'templates/views/root_view.html',
      controller: 'RootController',
      controllerAs: 'rootCtrl'
    })
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
      templateUrl: 'templates/views/group_list_view.html',
      controller: 'GroupListController',
      controllerAs: 'groupListCtrl'
    })
    .when('/group/:groupName', {
      templateUrl: 'templates/views/group_view.html',
      controller: 'GroupDetailController',
      controllerAs: 'groupDetailCtrl'
    })
    .when('/light/all', {
      templateUrl: 'templates/views/all_lights_view.html',
      controller: 'AllLightsController',
      controllerAs: 'allCtrl'
    })
    .when('/light/create', {
      templateUrl: 'templates/views/create_light.html',
      controller: 'CreateLightController',
      controllerAs: 'lightCtrl'
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
      redirectTo: '/'
    });
}]);
