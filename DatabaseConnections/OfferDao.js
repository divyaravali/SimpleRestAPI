var mongoose = require('mongoose');
//var db = mongoose.connect("mongodb://localhost:27017/nodetest2");
var OfferSchema = new mongoose.Schema({
	OfferId: Number,
	BuyingQuantity: Number,
	OfferDetails: String,
	BuyerStatus: String,	
    SellerStatus: String,
    OfferExpiry: Date,
    ProductID: Number,
    BuyerID: Number,
    LastModified: Date
});

var OfferModel = mongoose.model( 'Offer', OfferSchema );

function OfferDao() {
	}

OfferDao.prototype.viewOffers = function(callback, searchby, keyword){
	OfferModel.find(function( err, offers ) {
		callback(err, offers);
	    });
};

OfferDao.prototype.updateOffer = function(callback,OfferID, BuyingQuantity, OfferDetails, BuyerStatus, SellerStatus, OfferExpiry, ProductID, BuyerID, LastModified){
			
	OfferModel.count({OfferId: OfferID}, function(err, offerexists)
			{
				if(offerexists == 0){
					  callback('offer does not exixts',null);
				}else{
			
				OfferModel.findOne({OfferId:OfferID},function( err, offers ) {
					offers.OfferId = OfferID;
					offers.BuyingQuantity=  BuyingQuantity;
					offers.OfferDetails =  OfferDetails;
					offers.BuyerStatus=  BuyerStatus;
					offers.SellerStatus =  SellerStatus;
					offers.OfferExpiry=  OfferExpiry;
					offers.ProductID =  ProductID;
					offers.BuyerID=  BuyerID;
					offers.LastModified =  LastModified;
				    offers.save( function( err,offers ) {
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





OfferDao.prototype.createOffer = function(callback,OfferId, BuyingQuantity, OfferDetails, BuyerStatus, SellerStatus, OfferExpiry, ProductID, BuyerID, LastModified){
	
	
	var offer = new OfferModel({
		OfferId: OfferId,
		BuyingQuantity: BuyingQuantity,
		OfferDetails: OfferDetails,
		BuyerStatus: BuyerStatus,	
	    SellerStatus: SellerStatus,
	    OfferExpiry: OfferExpiry,
	    ProductID: ProductID,
	    BuyerID: BuyerID,
	    LastModified: LastModified
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
	

};
	






module.exports = OfferDao;


