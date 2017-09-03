angular.module('walmart').config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
     $urlRouterProvider.otherwise('/');
     $locationProvider.hashPrefix('');
     getRoutes().forEach(function (route) {
         $stateProvider.state(route);
     });
 });
 
 function getRoutes() {
     return [
          {
               name: 'layout',
               templateUrl: 'app/layout/layout.html'
          },
          {    
               name: 'root',
               url: '/',
               title: 'Search',
               parent: 'layout',
               templateUrl: 'app/search-product/search-product.html'

          },
          {    
               name: 'detail',
               url: '/detail',
               title: 'Detail',
               parent:'layout',
               templateUrl: 'detail/detail.html'
          },
     ];
 }
 