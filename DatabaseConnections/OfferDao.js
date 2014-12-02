var mongoose = require('mongoose');
//var autoIncrement = require('mongoose-auto-increment');
//var db = mongoose.connect("mongodb://localhost:27017/nodetest2");
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(db);
var OfferSchema = new mongoose.Schema({
	OfferId: Number,
	//_id: OfferId,
	BuyingQuantity: Number,
	OfferDetails: String,
	BuyerStatus: String,	
    SellerStatus: String,
    OfferExpiry: Date,
    ProductID: Number,
    BuyerID: Number,
    LastModified: Date
});
//OfferSchema.plugin(autoIncrement.plugin, { model: 'Offer', field:'_id' , startAt: 2, increment: 2});
var OfferModel = mongoose.model( 'Offer', OfferSchema );

function OfferDao() {
	}

OfferDao.prototype.viewOffers = function(callback, searchby){
	OfferModel.find(function( err, offers ) {
		callback(err, offers);
	    });
};

OfferDao.prototype.byofferid = function(callback, OfferID){
	console.log("OfferID", +OfferID);
	OfferModel.count({OfferId: OfferID}, function(err, offerexists)
			{
		console.log("countbyofferid", +offerexists);
				if(offerexists == 0){
					  callback(' :offer does not exixts',null);
				}else{
			
				OfferModel.find({OfferId:OfferID},function( err, offers ) {
					 if( !err ) {
				            console.log( 'offers are: ' );
				            callback( null,offers );
				        } else {
				            console.log( err );
				            callback('ERROR',null);
				        }
				});
				}
			});
	
};
OfferDao.prototype.byproductid = function(callback, ProductId){
	console.log("productid", +ProductId);
	OfferModel.count({ProductID: ProductId}, function(err, offerexists)
			{
		console.log("countproductid", +offerexists);
				if(offerexists == 0){
					  callback(' :offer does not exixts',null);
				}else{
			
				OfferModel.find({ProductID:ProductId},function( err, offers ) {
					 if( !err ) {
				            console.log( 'offers are: ' );
				            callback( null,offers );
				        } else {
				            console.log( err );
				            callback('ERROR',null);
				        }
				});
				}
			});
	
};

OfferDao.prototype.updateOffer = function(callback,OfferID, BuyingQuantity, OfferDetails, BuyerStatus, SellerStatus, OfferExpiry, ProductID, BuyerID, LastModified){
	console.log("OfferID", +OfferID);
	OfferModel.count({OfferId: OfferID}, function(err, offerexists)
			{
			console.log("offerexists",+offerexists);
				if(offerexists == 0){
					  callback('offer does not exixts',null);
				}else{
			
				OfferModel.findOne({OfferId:OfferID},function( err, offers ) {
					//offers.OfferId = OfferID;
					offers.BuyingQuantity=  BuyingQuantity;
					offers.OfferDetails =  OfferDetails;
					offers.BuyerStatus=  BuyerStatus;
					offers.SellerStatus =  SellerStatus;
					offers.OfferExpiry=  OfferExpiry;
					offers.ProductID =  ProductID;
					offers.BuyerID=  BuyerID;
					offers.LastModified =  LastModified;
					
				    offers.save(function( err,offers ) {
			        if( !err ) {
			            console.log( 'updated' );
			            callback( null,offers );
			        } else {
			            console.log( err );
			            callback('ERROR',null);
			        }
			    });
				});	
				}
			});
			
		};





OfferDao.prototype.createOffer = function(callback, BuyingQuantity, OfferDetails, BuyerStatus, SellerStatus, OfferExpiry, ProductID, BuyerID, LastModified){
	console.log("OfferID", +OfferID);
	var offerCount;
	var now = new Date();
//	OfferModel.count({OfferId: OfferID}, function(err, offerexists)
//			{
//			console.log("offerexists",+offerexists);
//				if(offerexists == 0){
	OfferModel.count(function( err, count ) {
		offerCount=count+1;
	    console.log("The number of offers "+offerCount);
	    var offer = new OfferModel({
		OfferId: offerCount,
		BuyingQuantity: BuyingQuantity,
		OfferDetails: OfferDetails,
		BuyerStatus: BuyerStatus,	
	    SellerStatus: SellerStatus,
	    OfferExpiry: OfferExpiry,
	    ProductID: ProductID,
	    BuyerID: BuyerID,
	    LastModified: now
    });
	 
	    offer.save( function( err,offers ) {
	        if( !err ) {
	            console.log( 'created' );
	            callback( null,offer );
	        } else {
	            console.log( err );
	            callback('ERROR',null);
	        }
	    });
	    
	   });

};
	






module.exports = OfferDao;


