(function () {
     angular.module('walmart').factory('ProductsService', ProductsService);

     function ProductsService($http,  $q, $sce, _ ) {

          var productLookupResult;
          var searchResult;

          function getSearchResult() {
               return searchResult;
          }

          function searchAPI(searchString) {
               return $http.get(`searchAPI/${searchString}`)
               .then((result) => {
                    searchResult = result.data;
                    return searchResult;
               })
          }

          function productsLookupAPI(ids) {
               return $http.get(`productsLookupAPI/`+ids);
          }
          function productLookupAPI(ids) {
            return $http.get(`productLookupAPI/`+ids);
       }

          function getItemById(itemId){
               let deferred = $q.defer();
               if(searchResult){
                    let found =  _.find(searchResult.items, {'itemId': +itemId})
                    deferred.resolve(found);
               }
               else {
                     $http.get(`productLookupAPI/`+itemId)
                    .then((result) =>{
                         deferred.resolve(result.data);
                    
                    })
               }
               return deferred.promise;
          }

          function recommendationLookupAPI(itemId) {
               return $http.get('/recommendationAPI/'+itemId)
          }

          return {
               searchAPI: searchAPI,
               getSearchResult: getSearchResult,
               productLookupAPI: productLookupAPI,
               productsLookupAPI: productsLookupAPI,
               recommendationLookupAPI: recommendationLookupAPI,
               getItemById: getItemById
          }
     }
})();