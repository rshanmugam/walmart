

(function () {
     angular.module('walmart').controller('ProductDetailController', ProductDetailController);

     function ProductDetailController($stateParams, ProductsService, $state, _, $q) {
          var self = this;
          self.itemId = $stateParams.itemId
          self.count = 5;
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