'use strict';

class NavbarController {

  isLoggedIn = false;
  isAdmin = false;
  getUser = null;
  $mdSidenav = null;

  constructor(Auth, $mdSidenav) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getUser = Auth.getCurrentUser;
    this.$mdSidenav = $mdSidenav;
  }

  toggleSideNav() {
    this.$mdSidenav('left').toggle();
  }
}

angular.module('olafApp')
  .controller('NavbarController', NavbarController);
