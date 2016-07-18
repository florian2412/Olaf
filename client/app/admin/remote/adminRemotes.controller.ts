'use strict';

class AdminRemotesController {

  Remote: any;
  socket: any;
  $mdSidenav: any;
  $mdDialog: any;

  remotes: Object[];
  newRemote: {
    name: String,
    position: Number,
  };

  selectedIndex: Number;
  useFullScreen: Boolean;

  gridsterOpts: any;

  constructor(Remote, socket, $mdSidenav, $mdDialog, $mdMedia) {
    this.Remote = Remote;
    this.socket = socket.socket;
    this.$mdSidenav = $mdSidenav;
    this.$mdDialog = $mdDialog;

    this.remotes = this.Remote.query();

    this.initSocket();
    this.selectedIndex = 0;
    this.useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

    this.initGridster();
  }

  initSocket() {
    this.socket.on('remote:save', (remote) => {
      var oldItem = _.find(this.remotes, {_id: remote._id});
      var remoteResource = new this.Remote(remote);

      if (oldItem) {
        _.merge(oldItem, remoteResource);
      } else {
        this.remotes.push(remoteResource);
      }
    });

    this.socket.on('remote:remove', (remote) => {
      _.remove(this.remotes, {_id: remote._id});
    });
  }

  initGridster() {
    this.gridsterOpts = {
      columns: 6,
      floating: false,
      pushing: false,
      isMobile: true,
      mobileBreakPoint: 300
    };
  }

  addRemote(form: any) {
    if (form.$valid) {
      this.newRemote.position = this.remotes.length;
      this.Remote.save(this.newRemote);
    }
  }

  backRemotePosition(remote: any) {
    if (remote.position > 0) {
      this.permuteRemote(remote, remote.position - 1);
    }
  }

  nextRemotePosition(remote: any) {
    if (remote.position < this.remotes.length - 1) {
      this.permuteRemote(remote, remote.position + 1);
    }
  }

  permuteRemote(remote, newPosition) {
    var permutedItem: any = _.find(this.remotes, {position: newPosition});
    permutedItem.position = remote.position;
    permutedItem.$update();

    remote.position = newPosition;
    remote.$update();
  }

  updateRemote(remote, ev) {
    var dialog: any = this.$mdDialog.prompt()
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
    var dialog: any = this.$mdDialog.confirm()
      .title('Demande de confirmation')
      .textContent('Êtes vous sûr de vouloir supprimer cette télécommande ?')
      .targetEvent(ev)
      .ok('Oui')
      .cancel('Non');

    this.$mdDialog.show(dialog).then(() => {
      angular.forEach(this.remotes, (currentRemote: any) => {
        if (currentRemote.position > remote.position) {
          currentRemote.position = currentRemote.position - 1;
          currentRemote.$update();
        }
      });

      remote.$remove();
    });
  }

  addButtonToRemote(ev) {
    var selectedRemote: any = _.find(this.remotes, {position: this.selectedIndex});

    if (selectedRemote) {
      selectedRemote.$update();

      this.$mdDialog.show({
        controller: AddButtonToRemoteController,
        controllerAs: 'addButtonToRemote',
        templateUrl: 'app/admin/remote/addButtonToRemote.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: this.useFullScreen,
        locals: {
          remote: selectedRemote
        },
      });
    }
  }

  saveChanges() {
    angular.forEach(this.remotes, (remote: any) => {
      remote.$update();
    });
  }

  configButton(button, ev) {
    var selectedRemote: any = _.find(this.remotes, {position: this.selectedIndex});
    this.$mdDialog.show({
      controller: ConfigButtonController,
      controllerAs: 'configButton',
      templateUrl: 'app/admin/remote/configButton.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: this.useFullScreen,
      locals: {
        button: button,
        remote: selectedRemote
      },
    }).finally(() => {
      selectedRemote.$update();
    });
  }

}

angular.module('olafApp')
  .controller('AdminRemotesController', AdminRemotesController);
