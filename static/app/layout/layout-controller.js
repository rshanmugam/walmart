(function () {
     angular.module('walmart').controller('LayoutController', LayoutController);

     function LayoutController($scope, ProductsService, $rootScope, _, $state) {
          var self = this;
          
          self.search = function () {
               $state.go('root')
               .then(() =>{
                    $scope.$broadcast('ON_SEARCH', {query: self.searchString});
               })
          }
     }
})();