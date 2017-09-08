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
               templateUrl: 'app/product-list/product-list.html'

          },
          {    
               name: 'detail',
               url: '/detail/:itemId',
               title: 'Detail',
               parent:'layout',
               templateUrl: 'app/product-detail/product-detail.html'
          },
     ];
 }
 