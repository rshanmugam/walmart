(function () {
     'use strict';
     angular.module('walmart', ['ui.router']);

     angular.module('walmart').constant('config', {
          apiUrl: 'http://api.walmartlabs.com/v1/',
          apiKey: 'wb7ba789ha8b23a4wqk9aurs'

     });

     angular.module('walmart').factory('_', ['$window',
          function ($window) {
               return $window._;
          }
     ]);

})();