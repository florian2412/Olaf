'use strict';

angular.module('olafApp')
  .directive('responsiveButton', function($window) {
    return {
      link: function(scope: any, element: any, attrs: any) {
        console.log(element);
        console.log(element[0].querySelector('.gridster-content'));
        console.log(element[0].querySelector('md-icon'));
        //$window.addResizeListener(element[0], () => {
          //console.log('test');
        //});
        console.log(element[0].clientWidth);
        element[0].onresize = function() {
          console.log(element[0].clientWidth);
        };
      }
    };
  });
