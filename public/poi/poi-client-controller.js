angular.module('pois').controller('PoisController', ['$scope', '$routeParams', '$timeout','$location',
    'Authentication', 'Pois', 'Upload', 'Flash',
    function($scope, $routeParams, $timeout, $location,
             Authentication, Pois, Upload, Flash) {
        $scope.authentication = Authentication;

        $scope.uploadImage= function(file) {
            file.upload = Upload.upload({
                url: '/uploads/images/' + $scope.poi._id,
                headers: {
                    'Content-Type': false
                },
                fields: {username: $scope.username},
                file: file,
                fileFormDataName: 'img'
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    $scope.poi.photo = response.data + "?" + new Date().getTime();
                    $scope.file = null;
                    Flash.create('success', 'Photo updated!', 'custom-class');
                });
            }, function (response) {
                Flash.create('error', response.error, 'custom-class');
            });
        };

        $scope.map = {
            center: {
                latitude:44.81609,
                longitude:20.45996
            },
            clickedMarker: {
                id: 0,
                options:{
                }
            },
            zoom:18,
            events: {
                click: function (marker, eventName, args) {
                    console.log(args[0].latLng.lat());
                    console.log(args[0].latLng.lng());
                    var lat = args[0].latLng.lat();
                    var lng = args[0].latLng.lng();
                    $scope.map.clickedMarker = {
                        id: 0,
                        /*options: {
                            labelContent: 'You clicked here ' + 'lat: ' + lat + ' lon: ' + lon,
                            labelClass: "marker-labels",
                            labelAnchor:"50 0"
                        },*/
                        latitude: lat,
                        longitude: lng
                    };
                    if($scope.poi) {
                        $scope.poi.coordinates = [lng, lat];
                    }
                    //scope apply required because this event handler is outside of the angular domain
                    $scope.$apply();
                }
            }
        };

        $scope.create = function() {
            var poi = new Pois({
                title: this.title,
                photo: this.photo,
                audio: this.audio,
                description: this.description,
                coordinates: [
                    $scope.map.clickedMarker.longitude,
                    $scope.map.clickedMarker.latitude
                ],

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