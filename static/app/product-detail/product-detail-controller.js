

(function () {
     angular.module('walmart').controller('ProductDetailController', ProductDetailController);

     function ProductDetailController($stateParams, ProductsService, $state, _, $q, $timeout) {
          var self = this;
          self.itemId = $stateParams.itemId
          self.currentList = 1;
          self.listSize = 5;
          self.nextSet = nextSet;
          self.previousSet = previousSet;

          function nextSet(){
               self.currentList++;
              
          }

          function previousSet(){
               self.currentList--;
               
          }
          
          function init(){
               ProductsService.getItemById(self.itemId)
               .then((result) => {
                    self.detail = result;
                    ProductsService.recommendationLookupAPI(self.itemId)
                    .then((result) => {
                    self.recommendations = result.data;
                    
                    })
               })
              
          }

          init();
     

     }
})();