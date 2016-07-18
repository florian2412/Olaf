'use strict';


class MainController {

  Remote: any;
  livebox: any;
  gridsterOpts: any;

  remotes: Object[];

  constructor(Remote, livebox) {
    this.Remote = Remote;
    this.livebox = livebox;
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

  onClick(button: any) {
    if (button.type = 'Livebox') {
      this.livebox.click(button.code);
    }
  }

  onLongPress(button: any) {
    if (button.type = 'Livebox') {
      this.livebox.longPress(button.code);
    }
  }

  onTouchEnd(button: any) {
    if (button.type = 'Livebox') {
      this.livebox.touchEnd(button.code);
    }
  }

}

angular.module('olafApp')
  .controller('MainController', MainController);
