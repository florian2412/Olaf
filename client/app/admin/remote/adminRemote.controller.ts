'use strict';

class AdminRemoteController {

  private $mdSidenav;

  constructor($mdSidenav) {
    this.$mdSidenav = $mdSidenav;
  }

}

angular.module('olafApp')
  .controller('AdminRemoteController', AdminRemoteController);

