
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

Offer.prototype.byofferid = function(callback,request)
{
	
	console.log("view Offers by offerid ");
	offerobj.byofferid(function(err,res) {
		callback(err,res);
		
	},request.OfferId);

};

Offer.prototype.byproductid = function(callback,request)
{
	
	console.log("view Offers by productID ");
	offerobj.byproductid(function(err,res) {
		callback(err,res);
		
	},request.ProductID);

};
Offer.prototype.createOffer = function(callback,request)
{
	
	//console.log("Make an Offer function ");
	offerobj.createOffer(function(err,res) {
		callback(err,res);
		
	},request.OfferId, request.BuyingQuantity, request.OfferDetails, request.BuyerStatus, request.SellerStatus, request.OfferExpiry, request.ProductID, request.BuyerID, request.LastModified);

};


Offer.prototype.updateOffer = function(callback,request)
{
	console.log("Update Offer function ");
	offerobj.updateOffer(function(err,res) {
		
		callback(err,res);
		
	},request.OfferId, request.BuyingQuantity, request.OfferDetails, request.BuyerStatus, request.SellerStatus, request.OfferExpiry, request.ProductID, request.BuyerID, request.LastModified);

};





module.exports = Offer;
