var express  = require('express');
var app      = express();                               // create our app w/ express

app.use(express.static(__dirname + '/static'));                 // set the static files location /public/img will be /img for users'

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");