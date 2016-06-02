'use strict';

class SettingsController {

  user = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  erreurs = '';

  Auth = null;
  $mdToast = null;

  constructor(Auth, $mdToast) {
    this.Auth = Auth;
    this.$mdToast = $mdToast;
  }

  changePassword(form) {
    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.erreurs = '';
          this.openSuccessToast();
        })
        .catch(() => {
          this.erreurs = 'Le mot de passe est incorrect';
        });
    }
  }

  openSuccessToast() {
    this.$mdToast.show(
      this.$mdToast.simple()
        .textContent('Votre mot de passe a bien été changé !')
        .hideDelay(3000)
    );
  }
}

angular.module('olafApp')
  .controller('SettingsController', SettingsController);
