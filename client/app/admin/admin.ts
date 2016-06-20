'use strict';

angular.module('olafApp')
.config(function($stateProvider) {
  $stateProvider
    .state('admin', {
      url: '/admin',
      authenticate: 'admin',
      templateUrl: 'app/admin/admin.html',
      controller: 'AdminController',
      controllerAs: 'admin',
    })
    .state('adminUsers', {
      url: '/admin/users',
      selectedTabs: 0,
      views: {
        '': {
          templateUrl: 'app/admin/admin.html',
          controller: 'AdminController',
          controllerAs: 'admin',
        },
        'tab@adminUsers': {
          templateUrl: 'app/admin/users/adminUsers.html',
          controller: 'AdminUsersController',
          controllerAs: 'adminUsers',
        }
      },
      authenticate: 'admin'
    })
    .state('adminRemote', {
      url: '/admin/remote',
      selectedTabs: 1,
      views: {
        '': {
          templateUrl: 'app/admin/admin.html',
          controller: 'AdminController',
          controllerAs: 'admin',
        },
        'tab@adminRemote': {
          templateUrl: 'app/admin/remote/adminRemotes.html',
          controller: 'AdminRemotesController',
          controllerAs: 'adminRemotes',
        }
      },
      authenticate: 'admin'
    });
})

.run(function($rootScope, $state) {
  $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
    $rootScope.selectedTabs = (next.selectedTabs) ? next.selectedTabs : 0;
  });
});
