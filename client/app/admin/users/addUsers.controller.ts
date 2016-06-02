'use strict';

class AddUsersController {

  User = null;
  $mdDialog = null;

  user: Object = {
    name: '',
    email: '',
    password: '',
    role: '',
  };

  errors = {};

  constructor(User, $mdDialog) {
    this.User = User;
    this.$mdDialog = $mdDialog;
  }

  addUser(form) {
    if (form.$valid) {
      this.User.save(this.user, (data) => {
        this.$mdDialog.hide(true);
      }, (err) => {
        angular.forEach(err.data.errors, (error, field) => {
          form[field].$setValidity('mongoose', false);
          this.errors[field] = error.message;
        });
      });
    }
  }

}

angular.module('olafApp')
  .controller('AddUsersController', AddUsersController);
