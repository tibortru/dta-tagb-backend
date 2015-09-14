angular.module('pois').factory('Pois', ['$resource',
    function($resource) {
        return $resource('pois/:poiId', {
            poiId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);