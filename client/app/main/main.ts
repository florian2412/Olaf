'use strict';

angular.module('olafApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        authenticate: true,
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });
  });
