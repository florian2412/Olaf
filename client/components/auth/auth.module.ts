'use strict';

angular.module('olafApp.auth', [
  'olafApp.constants',
  'olafApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
