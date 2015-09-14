angular.module('pois').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/pois', {
                templateUrl: 'views/list-pois.client.view.html'
            }).
            when('/pois/create', {
                templateUrl: 'views/create-poi.client.view.html'
            }).
            when('/pois/:poiId', {
                templateUrl: 'views/view-poi.client.view.html'
            }).
            when('/pois/:poiId/edit', {
                templateUrl: 'views/edit-poi.client.view.html'
            });
    }
]);