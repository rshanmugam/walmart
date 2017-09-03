(function(){
     angular.module('walmart').controller('SearchProductController', SearchProductController);

     function SearchProductController($http, config, $q, _){
          var self = this;
          self.search = search;

          function search(){
               $http.get(config.apiUrl + `search?apikey=${config.apiKey}&query=${self.searchString}`)
               .then(function(result){
                    if(result && result.data){
                         let ids = _.map(result.data, 'itemId');
                         console.log(ids);
                    }
               }, function(err){
                    console.log(err)
               })
          }
     }
})();