'use strict';

declare var Highcharts: any;
declare var moment: any;

angular.module('olafApp', [
  'olafApp.auth',
  'olafApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'validation.match',
  'ngMaterial',
  'ngMessages',
  'md.data.table',
  'ngMaterialDatePicker',
  'gridster',
  'mdColorPicker',
])

.config(function($urlRouterProvider, $locationProvider) {
  $urlRouterProvider
    .otherwise('/');

  $locationProvider.html5Mode(true);
})

.config(function ($mdThemingProvider) {
  var customPrimary = {
    '50': '#6bebd1',
    '100': '#55e7ca',
    '200': '#3ee4c4',
    '300': '#28e1bd',
    '400': '#1dd2af',
    '500': '#1abc9c',
    '600': '#17a689',
    '700': '#148f77',
    '800': '#117964',
    '900': '#0e6252',
    'A100': '#81eed8',
    'A200': '#98f1df',
    'A400': '#aef4e6',
    'A700': '#0b4c3f',
    'contrastDefaultColor': 'light'
  };
  $mdThemingProvider.definePalette('customPrimary', customPrimary);

  var customAccent = {
    '50': '#60161b',
    '100': '#741b20',
    '200': '#892026',
    '300': '#9e252c',
    '400': '#b32932',
    '500': '#c72e37',
    '600': '#d7525a',
    '700': '#dc666d',
    '800': '#e07b81',
    '900': '#e59095',
    'A100': '#d7525a',
    'A200': '#D23D46',
    'A400': '#c72e37',
    'A700': '#eaa4a9',
    'contrastDefaultColor': 'light'
  };
  $mdThemingProvider.definePalette('customAccent', customAccent);
  $mdThemingProvider.theme('default').primaryPalette('customPrimary').accentPalette('customAccent');
});
