
var offerDao = require("../DatabaseConnections/OfferDao");
var offerobj = new offerDao();

var ejs = require("ejs");

function Offer() {

}


Offer.prototype.viewOffers = function(callback,request)
{
	
	console.log("view Offers function ");
	offerobj.viewOffers(function(err,res) {
		callback(err,res);
		
	});

};

Offer.prototype.byofferId = function(callback,offerId)
{
	console.log(offerId);
	console.log("view Offers by offerId ");
	offerobj.byofferId(function(err,res) {
		callback(err,res);
		
	},offerId);

};

Offer.prototype.byproductId = function(callback,productId)
{
	
	console.log("view Offers by productId ");
	//console.log(productId);
	offerobj.byproductId(function(err,res) {
		callback(err,res);
		
	},productId);

};
Offer.prototype.createOffer = function(callback,request)
{
	
	//console.log("Make an Offer function ");
	offerobj.createOffer(function(err,res) {
		callback(err,res);
		
	}, request.buyingQty, request.offeredDetails, request.buyerStatus, request.sellerStatus, request.offerExpiry, request.productId, request.buyerId);

};


Offer.prototype.updateOffer = function(callback,request)
{
	console.log("Update Offer function ");
	offerobj.updateOffer(function(err,res) {
		
		callback(err,res);
		
	},request.offerId, request.buyingQty, request.offeredDetails, request.buyerStatus, request.sellerStatus, request.offerExpiry, request.productId, request.buyerId);

};





module.exports = Offer;
