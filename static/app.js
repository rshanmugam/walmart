(function () {
     'use strict';
     angular.module('walmart', ['ui.router','ngAnimate', 'ngSanitize', 'ui.bootstrap']);

     angular.module('walmart').factory('_', ['$window',
          function ($window) {
               return $window._;
          }
     ]);

     angular.module('walmart').filter('startFrom', function() {
          return function(input, start) {
              start = +start; //parse to int
              return input.slice(start);
          }
      });
})();