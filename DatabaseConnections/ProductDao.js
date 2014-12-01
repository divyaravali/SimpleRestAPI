
var mongoose = require('mongoose');
//var db = mongoose.connect("mongodb://localhost:27017/nodetest2");

	var ProductSchema = new mongoose.Schema({
		productId:Number,
		productName:String,
		quantity:Number,
		userId:Number,
		expectedOffer:String,
		productDesc:String,
		prodExpDate:Date,
		isValid:Number,
		categoryId:Number,
		lastUpdated:Date
	    
	});
	var ProductModel = mongoose.model( 'Product', ProductSchema );




function ProductDao() {
	
}



ProductDao.prototype.createProduct = function(callback, productName,quantity,userId,expectedOffer,productDesc,prodExpDate,isValid,categoryId,lastUpdated){
	var productCount;
	var now = new Date();
	// UserModel.count({emailId: emailID}, function(err, emailExists)
	 //{
			// if(emailExists == 0){

			ProductModel.count(function( err, count ) {
						
						productCount=count+1;
						console.log("The number of users "+productCount);
						var product = new ProductModel({
							productId:productCount,
							productName:productName,
							quantity:quantity,
							userId:userId,
							expectedOffer:expectedOffer,
							productDesc:productDesc,
							prodExpDate:prodExpDate,
							isValid:isValid,
							categoryId:categoryId,
							lastUpdated:now
					    });
						
					    product.save( function( err,users ) {
					        if( !err ) {
					            console.log( 'created'+product );
					            callback( null,product );
					        } else {
					            console.log( err );
					            callback('ERROR',null);
					        }
					    });
						
					});
				 
			/* }else{
				 callback('User Already Exits',null);
			 }*/
	// });
	
	

};


module.exports = ProductDao;


