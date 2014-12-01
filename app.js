
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var ejs = require("ejs");

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.cookieParser());
app.use(express.session({
	secret : '1234567890QWERTY'
}));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

// Customer Related
app.get('/viewCustomers', routes.viewCustomers);
app.post('/validateUser', routes.validateUser);
app.del('/removeuser/:emailId', routes.removeUser);
app.put('/updateuser', routes.updateuser);
app.post('/create', routes.createuser);
//offer
app.get('/viewOffers', routes.viewOffers);
app.get('/byofferid', routes.byofferid);
app.get('/byproductid', routes.byproductid);
app.put('/byofferid', routes.byofferid);
app.put('/byproductid', routes.byproductid);
app.put('/updateoffer', routes.updateoffer);
app.post('/createoffer', routes.createoffer);
//Product Related
app.post('/createProduct', routes.createProduct);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
