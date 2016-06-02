'use strict';

angular.module('olafApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('weather', {
        url: '/weather',
        authenticate: true,
        templateUrl: 'app/weather/weather.html',
        controller: 'WeatherController',
        controllerAs: 'weather'
      });
  });
