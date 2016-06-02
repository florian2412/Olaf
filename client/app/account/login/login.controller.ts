'use strict';

class LoginController {

  Auth = null;
  $state = null;

  user = {
    email: '',
    password: ''
  };
  erreurs = '';

  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }

  login(form) {
    if (form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        this.$state.go('main');
      })
      .catch(err => {
        this.erreurs = err.message;
      });
    }
  }
}

angular.module('olafApp')
  .controller('LoginController', LoginController);
