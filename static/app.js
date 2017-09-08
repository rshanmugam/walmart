(function () {
     'use strict';
     angular.module('walmart', ['ui.router','ngAnimate', 'ngSanitize', 'ui.bootstrap']);

     angular.module('walmart').factory('_', ['$window',
          function ($window) {
               return $window._;
          }
     ]);

     
})();