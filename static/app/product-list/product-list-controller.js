(function () {
     angular.module('walmart').controller('ProductsController', ProductsController);

     function ProductsController($scope, ProductsService, $state, _, $stateParams) {
          var self = this;
         
          $scope.$on('ON_SEARCH', (event, args) => {
               ProductsService.searchAPI(args.query)
                    .then((result) => {
                         self.result = result;
                         let ids = _.map(self.result.items, 'itemId').join(',');
                         ProductsService.productsLookupAPI(ids)
                              .then((response) => {
                                   _.each(response.data.items, (item) => {
                                        let result = _.find(self.result.items, {
                                             itemId: item.itemId
                                        })
                                        result.productDetail = item;

                                   })
                                   console.log(self.result);
                              })
                    })
                    .catch((err) => {
                         console.log(err);
                    })
          });


          self.detail = function (itemId) {
               $state.go('detail', {
                    itemId: itemId
               })
          }

     }
})();