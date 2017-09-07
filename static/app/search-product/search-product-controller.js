(function () {
     angular.module('walmart').controller('SearchProductController', SearchProductController);

     function SearchProductController($http, config, $q, $sce, _, $timeout) {
          var self = this;
          self.search = search;

          function search() {
               let searchUrl = $sce.trustAsResourceUrl(config.apiUrl + `search?apikey=${config.apiKey}&query=${self.searchString}`);

               let promise = [];
               $http.jsonp(searchUrl)
                    .then(function (result) {
                         if (result && result.data) {
                              let ids = _.map(result.data.items, 'itemId').join(',');
                              $http.jsonp($sce.trustAsResourceUrl(`http://api.walmartlabs.com/v1/items?ids=${ids}&apiKey=${config.apiKey}&format=json`))
                                   .then((data) => {
                                        console.log(data);
                                   })

                         }
                    }, function (err) {
                         console.log(err)
                    })
          }
     }
})();