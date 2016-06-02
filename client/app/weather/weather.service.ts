'use strict';

angular.module('olafApp')
  .factory('weather', function ($http) {
    return {
      get: function(start, end, callback) {
        var timestampStart = start.getTime();
        var timestampEnd = end.getTime();

        $http.get('/api/weather/' + timestampStart + '/' + timestampEnd + '/').success(function(data) {
          var result = {
            indoorTemps: [],
            outdoorTemps: [],
            pressures: []
          };

          if (data.length) {
            angular.forEach(data.filter((weather) => weather.type === 'indoorTemp'), (weather) => {
              result.indoorTemps.push([new Date(weather.date).getTime(), weather.value]);
            });

            angular.forEach(data.filter((weather) => weather.type === 'outdoorTemp'), (weather) => {
              result.outdoorTemps.push([new Date(weather.date).getTime(), weather.value]);
            });

            angular.forEach(data.filter((weather) => weather.type === 'pressure'), (weather) => {
              result.pressures.push([new Date(weather.date).getTime(), weather.value]);
            });
          }

          callback(result);
        });
      }
    };
  });

