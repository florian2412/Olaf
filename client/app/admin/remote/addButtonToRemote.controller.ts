'use strict';

class AddButtonToRemoteController {

  private $mdDialog: any;
  private livebox: any;
  private remote: any;

  constructor(Remote, $mdDialog, remote) {
    this.livebox = Remote.getLiveboxButtons();
    this.$mdDialog = $mdDialog;
    this.remote = remote;
  }

  cancel() {
    this.$mdDialog.cancel();
  }

  addLiveboxButton(button, ev) {
    button.type = 'Livebox';
    button.style = {
      color: '#616161',
      backgroundColor: '#FFFFFF'
    };
    this.remote.buttons.push(button);
    this.remote.$update();
    this.$mdDialog.cancel();
  }
}

angular.module('olafApp')
  .controller('AddButtonToRemoteController', AddButtonToRemoteController);
