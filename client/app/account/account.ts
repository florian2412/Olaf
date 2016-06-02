'use strict';

angular.module('olafApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .state('logout', {
        url: '/logout',
        referrer: 'main',
        template: '',
        controller: function($state, Auth) {
          Auth.logout();
          $state.go('login');
        }
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsController',
        controllerAs: 'settings',
        authenticate: true
      });
  })
  .run(function($rootScope) {
    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
      if (next.name === 'logout' && current && current.name && !current.authenticate) {
        next.referrer = current.name;
      }
      if (next.name === 'login' && current && current.name && current.authenticate) {
        next.referrer = current.name;
      }
    });
  });
