let express = require('express');
let app = express(); // create our app w/ express
let fetch = require('node-fetch');
let config = require('./config.js')();
let _ = require('lodash');

app.use(express.static(__dirname + '/static')); // set the static files location /public/img will be /img for users'

app.get('/recommendationAPI/:itemId', function (req, res) {
     let itemId = req.params.itemId;
     fetch(`${config.apiUrl}/nbp/?apiKey=${config.apiKey}&itemId=${itemId}`)
          .then(result => result.json())
          .then(recommendResult => {
               let ids = _.map(recommendResult.items, 'itemId').join(',');
               return fetch(`${config.apiUrl}/items?ids=${ids}&apiKey=${config.apiKey}`)
                    .then(result => result.json())
                    .then(lookupResult => {
                         _.each(recommendResult.items, (item) => {
                              let found = _.find(searchResult.items, {
                                   itemId: item.itemId
                              })
                              found.productDetail = item;
                         });
                         res.json(recommendResult);
                    });
          }).catch(err => {
               console.log(err);
          });
})

app.get('/searchAPI/:query', function (req, res) {
     let query = req.params.query;
     return fetch(`${config.apiUrl}/search/?apiKey=${config.apiKey}&query=${query}`)
          .then(result => result.json())
          .then(searchResult => {
               res.json(searchResult);
          }).catch(err => {
               console.log(err);
          });
})

app.get('/productsLookupAPI/:ids', function (req, res) {
     let ids = req.params.ids;
     fetch(`${config.apiUrl}/items?ids=${ids}&apiKey=${config.apiKey}`)
          .then(result => result.json())
          .then(result => {
               return res.json(result);
          }).catch(err => {
               console.log(err);
          });
})

app.get('/productLookupAPI/:id', function (req, res) {
     let id = req.params.id;
     fetch(`${config.apiUrl}/items/${id}?apiKey=${config.apiKey}`)
          .then(result => result.json())
          .then(result => {
               return res.json(result);
          }).catch(err => {
               console.log(err);
          });
})
// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");