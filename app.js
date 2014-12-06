
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

//app.get('/viewCustomers', routes.viewCustomers);


//app.post('/validateUser', routes.validateUser);


//app.del('/removeuser/:emailId', routes.removeUser);
//app.put('/updateuser', routes.updateuser);
app.post('/users', routes.createuser);//checked
app.get('/users/:userId', routes.getUserById);//checked

//Category
app.post('/category', routes.createCategory);//checked
app.get('/category', routes.viewCategories);//checked
app.get('/category/:categoryId', routes.getCategoryById);//checked

//Product Related
app.post('/category/:categoryId/product', routes.createProduct);//checked
app.put('/category/:categoryId/product/:productId', routes.updateProduct);//checked
app.del('/category/:categoryId/product/:productId', routes.removeProduct);//checked
app.get('/category/:categoryId/product/:productId', routes.getProductById);//checked
app.get('/category/:categoryId/product', routes.getProductsBycatId);//checked


//offer
app.get('/category/:categoryId/offer', routes.viewOffers);
app.get('/category/:categoryId/product/:productId/offer', routes.byproductid);//checked
app.post('/category/:categoryId/product/:productId/offer', routes.createoffer);//checked
app.get('/category/:categoryId/product/:productId/offer/:offerId', routes.byofferid);//checked
app.put('/category/:categoryId/product/:productId/offer/:offerId', routes.updateoffer);//checked
app.del('/category/:categoryId/product/:productId/offer/:offerId', routes.removeOffer);
//app.get('/byproductid', routes.byproductid);
//app.put('/byofferid', routes.byofferid);

//app.post('/createoffer', routes.createoffer);
//comment
app.post('/category/:categoryId/product/:productId/offer/:offerId/comment', routes.postComment);
app.get('/getCommentHistory', routes.getCommentHistory);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
