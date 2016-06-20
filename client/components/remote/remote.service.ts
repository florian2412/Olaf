'use strict';

(function() {

function RemoteResource($resource) {
  return $resource('/api/remotes/:id/:controller', {
    id: '@_id'
  }, {
    getLiveboxKeys: {
      method: 'GET',
      params: {
        id: 'livebox'
      }
    },
    'update': {method: 'PUT'},
  });
}

angular.module('olafApp')
  .factory('Remote', RemoteResource);

})();
