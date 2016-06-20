'use strict';

class AdminRemotesController {

  private Remote: any;
  private socket: any;
  private $mdSidenav: any;
  private $mdDialog: any;
  private $scope: any;

  private remotes: Object[];
  private newRemote: {
    name: String,
    type: String,
    position: Number,
  };

  private selectedIndex: Number;
  private selectedRemote: any;

  constructor(Remote, socket, $mdSidenav, $mdDialog, $scope) {
    this.Remote = Remote;
    this.socket = socket.socket;
    this.$mdSidenav = $mdSidenav;
    this.$mdDialog = $mdDialog;
    this.$scope = $scope;

    this.remotes = this.Remote.query();

    this.initSocket();
    this.selectedIndex = 0;

    $scope.$watch('adminRemotes.selectedIndex', (newIndex) => {
      this.selectedRemote = _.find(this.remotes, {position: newIndex});
    });
  }

  initSocket() {
    this.socket.on('remote:save', (remote) => {
      var oldItem = _.find(this.remotes, {_id: remote._id});
      var index = this.remotes.indexOf(oldItem);
      var remoteResource = new this.Remote(remote);

      if (oldItem) {
        this.remotes.splice(index, 1, remoteResource);
      } else {
        this.remotes.push(remoteResource);
      }
    });

    this.socket.on('remote:remove', (remote) => {
      _.remove(this.remotes, {_id: remote._id});
    });
  }

  addRemote(form) {
    if (form.$valid) {
      this.newRemote.position = this.remotes.length;
      this.Remote.save(this.newRemote);
    }
  }

  backRemotePosition(remote) {
    if (remote.position > 0) {
      this.permuteRemote(remote, remote.position - 1);
    }
  }

  nextRemotePosition(remote) {
    if (remote.position < this.remotes.length - 1) {
      this.permuteRemote(remote, remote.position + 1);
    }
  }

  permuteRemote(remote, newPosition) {
    var permutedItem = _.find(this.remotes, {position: newPosition});
    permutedItem.position = remote.position;
    permutedItem.$update();

    remote.position = newPosition;
    remote.$update();

    console.log('NEW POSITION ::::: ' + newPosition);
  }

  updateRemote(remote, ev) {
    console.log(remote);
    var dialog = this.$mdDialog.prompt()
      .title('Renommer la télécommande')
      .placeholder('Nouveau nom')
      .ariaLabel('Nouveau nom')
      .targetEvent(ev)
      .ok('Valider')
      .cancel('Annuler');

    this.$mdDialog.show(dialog).then((name) => {
      if (name) {
        remote.name = name;
        remote.$update();
      }
    });
  }

  deleteRemote(remote, ev) {
    var dialog = this.$mdDialog.confirm()
      .title('Demande de confirmation')
      .textContent('Êtes vous sûr de vouloir supprimer cette télécommande ?')
      .targetEvent(ev)
      .ok('Oui')
      .cancel('Non');

    this.$mdDialog.show(dialog).then(() => {
      angular.forEach(this.remotes, (currentRemote) => {
        if (currentRemote.position > remote.position) {
          currentRemote.position = currentRemote.position - 1;
          currentRemote.$update();
        }
      });

      remote.$remove();
    });
  }

}

angular.module('olafApp')
  .controller('AdminRemotesController', AdminRemotesController);

