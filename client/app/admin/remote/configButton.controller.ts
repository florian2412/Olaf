'use strict';

class ConfigButtonController {

  button: any;
  remote: any;
  $mdDialog: any;

  confirmDelete: boolean;

  constructor(button, remote, $mdDialog) {
    this.button = button;
    this.remote = remote;
    this.$mdDialog = $mdDialog;
    this.confirmDelete = false;
  }

  cancel() {
    this.$mdDialog.cancel();
  }

  showConfirmDelete() {
    this.confirmDelete = true;
  }

  hideConfirmDelete() {
    this.confirmDelete = false;
  }

  deleteButton(ev) {
    _.remove(this.remote.buttons, {_id: this.button._id});
    this.cancel();
  }
}

angular.module('olafApp')
  .controller('ConfigButtonController', ConfigButtonController);
