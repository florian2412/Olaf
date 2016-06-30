'use strict';

class AdminRemotesController {

  private Remote: any;
  private socket: any;
  private $mdSidenav: any;
  private $mdDialog: any;

  private remotes: Object[];
  private newRemote: {
    name: String,
    type: String,
    position: Number,
  };

  private selectedIndex: Number;
  private selectedRemote: any;
  private useFullScreen: Boolean;

  constructor(Remote, socket, $mdSidenav, $mdDialog, $scope, $mdMedia) {
    this.Remote = Remote;
    this.socket = socket.socket;
    this.$mdSidenav = $mdSidenav;
    this.$mdDialog = $mdDialog;
    this.remotes = this.Remote.query(() => {
      if (this.remotes.length) {
        this.selectedRemote = this.remotes[0];
      }
    });

    this.initSocket();
    this.selectedIndex = 0;
    this.useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

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
  }

  updateRemote(remote, ev) {
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

  addButtonToRemote(ev) {
    if (this.selectedRemote && this.selectedRemote.type === 'Livebox') {
      this.selectedRemote.$update();
      this.$mdDialog.show({
        controller: AdminLiveboxRemoteController,
        controllerAs: 'adminLiveboxRemote',
        templateUrl: 'app/admin/remote/adminLiveboxRemote.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: this.useFullScreen,
        locals: {
          remote: this.selectedRemote
        },
      });
    }
  }

  saveChanges() {
    angular.forEach(this.remotes, (remote) => {
      remote.$update();
    });
  }

}

angular.module('olafApp')
  .controller('AdminRemotesController', AdminRemotesController);

angular.module('olafApp')
  .run(['gridsterConfig', (gridsterConfig) => {
    gridsterConfig.columns = 12;
    gridsterConfig.floating = false;
    gridsterConfig.pushing = false;
}]);

