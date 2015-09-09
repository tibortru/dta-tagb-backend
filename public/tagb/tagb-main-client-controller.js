angular.module('tagb-main').controller('TagbMainController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        $scope.authentication = Authentication;
    }
]);