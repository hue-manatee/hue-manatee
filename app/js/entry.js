const angular = require('angular');
const hueApp = angular.module('hueApp', [require('angular-route')]);

require('./controllers')(hueApp);
require('./directives')(hueApp);
require('./services')(hueApp);
