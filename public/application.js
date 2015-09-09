var appName = 'tagb';
var app = angular.module(appName, ['ngResource', 'ngRoute', 'tagb-main', 'users']);

app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('!');
}
]);

if (window.location.hash === '#_=_') window.location.hash = '#!';

angular.element(document).ready(function() {
    angular.bootstrap(document, [appName]);
});