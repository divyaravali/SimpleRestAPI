
var ProductDao = require("../DatabaseConnections/ProductDao");
var prodobj = new ProductDao();

var ejs = require("ejs");

function Product() {

}

Product.prototype.createProduct = function(callback,request)
{
	
	console.log("signUp function ");
	prodobj.createProduct(function(err,res) {
		callback(err,res);
		
	},request.productName,request.quantity,request.userId,request.expectedOffer,request.productDesc,request.prodExpDate,request.isValid,request.categoryId,request.lastUpdated);

};

module.exports = Product;
