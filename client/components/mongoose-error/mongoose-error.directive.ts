'use strict';

/**
 * Removes server error when user updates input
 */
angular.module('olafApp')
  .directive('mongooseError', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope: any, element: any, attrs: any, ngModel: any) {
        element.on('keydown', () => ngModel.$setValidity('mongoose', true));
      }
    };
  });
