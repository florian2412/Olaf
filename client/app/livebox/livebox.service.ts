'use strict';

angular.module('olafApp')
  .service('livebox', function ($http) {

    var url: String = 'http://dcodeurtvdorange:8080/remoteControl/cmd?operation=01&key={key}&mode={mode}';

    return {
      click: function(key) {
        return $http({
          method: 'GET',
          url: _.replace(_.replace(url, '{key}', key), '{mode}', '0'),
          headers: { 'Content-Type': 'application/json' }
        });
      },
      longPress: function(key) {
        return $http({
          method: 'GET',
          url: _.replace(_.replace(url, '{key}', key), '{mode}', '1'),
          headers: { 'Content-Type': 'application/json' }
        });
      },
      touchEnd: function(key) {
        return $http({
          method: 'GET',
          url: _.replace(_.replace(url, '{key}', key), '{mode}', '2'),
          headers: { 'Content-Type': 'application/json' }
        });
      }
    };

  });
