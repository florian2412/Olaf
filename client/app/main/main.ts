'use strict';

angular.module('olafApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        authenticate: true
      });
  });
