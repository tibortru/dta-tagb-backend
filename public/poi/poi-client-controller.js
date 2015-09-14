angular.module('pois').controller('PoisController', ['$scope', '$routeParams', '$location', 'Authentication', 'Pois',
    function($scope, $routeParams, $location, Authentication, Pois) {
        $scope.authentication = Authentication;

        $scope.create = function() {
            var poi = new Pois({
                title: this.title,
                photo: this.photo,
                audio: this.audio,
                coordinates: this.coordinates
            });

            poi.$save(function(response) {
                $location.path('pois/' + response._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function() {
            $scope.pois = Pois.query();
        };

        $scope.findOne = function() {
            $scope.poi = Pois.get({
                poiId: $routeParams.poiId
            });
        };

        $scope.update = function() {
            $scope.poi.$update(function() {
                $location.path('pois/' + $scope.poi._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.delete = function(poi) {
            if (poi) {
                poi.$remove(function() {
                    for (var i in $scope.pois) {
                        if ($scope.pois[i] === poi) {
                            $scope.pois.splice(i, 1);
                        }
                    }
                });
            } else {
                $scope.poi.$remove(function() {
                    $location.path('pois');
                });
            }
        };
    }
]);