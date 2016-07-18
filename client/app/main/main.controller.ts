'use strict';


class MainController {

  Remote: any;
  socket: any;

  gridsterOpts: any;

  remotes: Object[];

  constructor(Remote, socket) {
    this.Remote = Remote;
    this.socket = socket;

    this.remotes = this.Remote.query();

    this.initGridster();
  }

  initGridster() {
    this.gridsterOpts = {
      columns: 6,
      floating: false,
      pushing: false,
      isMobile: true,
      mobileBreakPoint: 300,
      resizable: {
        enabled: false,
      },
      draggable: {
       enabled: false,
      }
    };
  }

}

angular.module('olafApp')
  .controller('MainController', MainController);
