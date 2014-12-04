var mongoose = require('mongoose');
//var autoIncrement = require('mongoose-auto-increment');
//var db = mongoose.connect("mongodb://localhost:27017/nodetest2");
//var autoIncrement = require('mongoose-auto-increment');
//autoIncrement.initialize(db);
var OfferSchema = new mongoose.Schema({
	offerId: Number,
	//_id: offerId,
	buyingQty: Number,
	offeredDetails: String,
	buyerStatus: String,	
    sellerStatus: String,
    offerExpiry: Date,
    productId: Number,
    buyerId: Number,
    lastModified: Date
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

OfferDao.prototype.byofferId = function(callback, offerId){
	console.log("offerId", +offerId);
	OfferModel.count({offerId: offerId}, function(err, offerexists)
			{
		console.log("countbyofferId", +offerexists);
				if(offerexists == 0){
					  callback(' :offer does not exixts',null);
				}else{
			
				OfferModel.find({offerId:offerId},function( err, offers ) {
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

OfferDao.prototype.byproductId = function(callback, productId){
	console.log("productId", +productId);
	OfferModel.count({productId: productId}, function(err, offerexists)
			{
		console.log("countproductId", +offerexists);
				if(offerexists == 0){
					  callback(' :offer does not exixts',null);
				}else{
			
				OfferModel.find({productId:productId},function( err, offers ) {
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

OfferDao.prototype.updateOffer = function(callback,offerId, buyingQty, offeredDetails, buyerStatus, sellerStatus, offerExpiry, productId, buyerId){
	console.log("offerId", +offerId);
	var now = new Date();
	OfferModel.count({offerId: offerId}, function(err, offerexists)
			{
			console.log("offerexists",+offerexists);
				if(offerexists == 0){
					  callback('offer does not exixts',null);
				}else{
			
				OfferModel.findOne({offerId:offerId},function( err, offers ) {
					//offers.offerId = offerId;
					offers.buyingQty=  buyingQty;
					offers.offeredDetails =  offeredDetails;
					offers.buyerStatus=  buyerStatus;
					offers.sellerStatus =  sellerStatus;
					offers.offerExpiry=  offerExpiry;
					offers.productId =  productId;
					offers.buyerId=  buyerId;
					offers.lastModified =  now;
					
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





OfferDao.prototype.createOffer = function(callback, buyingQty, offeredDetails, buyerStatus, sellerStatus, offerExpiry, productId, buyerId){
	//console.log("offerId", +offerId);
	var offerCount;
	var now = new Date();
//	OfferModel.count({offerId: offerId}, function(err, offerexists)
//			{
//			console.log("offerexists",+offerexists);
//				if(offerexists == 0){
	OfferModel.count(function( err, count ) {
		offerCount=count+1;
	    console.log("The number of offers "+offerCount);
	    var offer = new OfferModel({
		offerId: offerCount,
		buyingQty: buyingQty,
		offeredDetails: offeredDetails,
		buyerStatus: buyerStatus,	
	    sellerStatus: sellerStatus,
	    offerExpiry: offerExpiry,
	    productId: productId,
	    buyerId: buyerId,
	    lastModified: now
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


