

(function () {
     angular.module('walmart').controller('ProductDetailController', ProductDetailController);

     function ProductDetailController($stateParams, ProductsService, $state, _, $q) {
          var self = this;
          self.itemId = $stateParams.itemId

          function init(){
               ProductsService.getItemById(self.itemId)
               .then((result) => {
                    self.detail = result;
                    ProductsService.recommendationLookupAPI(self.itemId)
                    .then((result) => {
                    self.recommendations = result.data;
                    
                    })
               })
               // var promise = [];
               // promise.push(ProductsService.getItemById(self.itemId));
               // promise.push(ProductsService.recommendationLookupAPI(self.itemId))
               // $q.all(promise)
               // .then((results) => {
               //      self.detail = results[0];
               //      self.recommendations = result[1];
               // })
          }

          init();
     

     }
})();