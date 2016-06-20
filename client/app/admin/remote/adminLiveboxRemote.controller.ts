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
}

angular.module('olafApp')
  .controller('AdminLiveboxRemoteController', AdminLiveboxRemoteController);
