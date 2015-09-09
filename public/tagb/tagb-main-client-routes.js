angular.module('tagb-main').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'views/tagb.main.client.view.html'
            }).
            otherwise({
                redirectTo: '/'
            });
    }
]);