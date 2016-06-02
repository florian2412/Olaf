'use strict';

class AdminController {

  tabs = [{
    name: 'Utilisateurs',
    url: '/users'
  }, {
    name: 'Télécommande',
    url: '/telecommande'
  }];

  $location = null;
  selectedTabs = null;

  constructor($location, $rootScope) {
    this.$location = $location;
    this.selectedTabs = $rootScope.selectedTabs;
  }

  switchTab(index) {
    if (index >= 0 && index < this.tabs.length) {
      this.$location.path('/admin' + this.tabs[index].url);
    }
  }
}

angular.module('olafApp')
  .controller('AdminController', AdminController);
