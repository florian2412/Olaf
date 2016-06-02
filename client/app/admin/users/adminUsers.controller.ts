'use strict';

class AdminUsersController {
  User = null;
  users: Object[];
  $mdDialog = null;
  $mdMedia = null;
  useFullScreen = false;
  table: any;

  constructor(User, $mdDialog, $mdMedia) {
    this.User = User;
    this.getUsers();
    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia;

    this.table = {
      query: {
        order: 'name',
        limit: 10,
        page: 1
      },
      limitOptions: [5, 10, 15]
    };

    this.useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));
  }

  getUsers() {
    this.users = this.User.query();
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }

  showConfirmDialog(user, ev) {
    var dialog = this.$mdDialog.confirm()
      .title('Demande de confirmation')
      .textContent('Êtes vous sûr de vouloir supprimer cet utilisateur ?')
      .targetEvent(ev)
      .ok('Oui')
      .cancel('Non');

    this.$mdDialog.show(dialog).then(() => {
      this.delete(user);
    });
  }

  showAddUserDialog(ev) {
    this.$mdDialog.show({
      controller: AddUsersController,
      controllerAs: 'addUsers',
      templateUrl: 'app/admin/users/addUsers.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: this.useFullScreen
    })
    .then((ajout) => {
      if (ajout) {
        this.getUsers();
      }
    });
  }
}

angular.module('olafApp')
  .controller('AdminUsersController', AdminUsersController);

