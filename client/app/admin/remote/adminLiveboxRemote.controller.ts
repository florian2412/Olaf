'use strict';

class AdminLiveboxRemoteController {

  private $mdDialog: any;
  private livebox: any;
  private remote: any;

  constructor(Remote, $mdDialog, remote) {
    this.livebox = Remote.getLiveboxKeys();
    this.$mdDialog = $mdDialog;
    this.remote = remote;
  }

  cancel() {
    this.$mdDialog.cancel();
  }

  addButton(button) {
    this.remote.buttons.push(button);
    this.remote.$update();
    this.$mdDialog.cancel();
  }
}

angular.module('olafApp')
  .controller('AdminLiveboxRemoteController', AdminLiveboxRemoteController);
