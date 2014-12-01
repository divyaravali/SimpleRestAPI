
var mongoose = require('mongoose');
var db = mongoose.connect("mongodb://localhost:27017/nodetest2");

	var UserSchema = new mongoose.Schema({
		userId:Number,
		emailId:String,
	    fname: String,
	    lname: String,
	    password: String,
	    mobileNum:Number
	});
	var UserModel = mongoose.model( 'User', UserSchema );




function UserDao() {
	
}


UserDao.prototype.validateUser = function(callback, emailID, password){
	
	UserModel.find({emailId:emailID},function( err, users ) {
		JSON.stringify(users);
		console.log("In validateusers"+users.userId);
		
		callback(err, users);
    });
	//connection.end();
	
	
};


UserDao.prototype.viewCustomers = function(callback, username, password){
	
	
		UserModel.find(function( err, users ) {
			callback(err, users);
	    });

	
	
};

UserDao.prototype.updateUser = function(callback,emailID, fname, lname, password, mobileNum){
	
	UserModel.count({emailId: emailID}, function(err, emailExists)
	{
		if(emailExists == 0){
			  callback('User does not exixts',null);
		}else{
	
		UserModel.findOne({emailId:emailID},function( err, users ) {
			 users.fname = fname;
		       users.lname=  lname;
		        users.password =  password;
		        users.mobileNum = mobileNum;
		        
		        users.save( function( err,users ) {
	        if( !err ) {
	            console.log( 'created' );
	            callback( null,users );
	        } else {
	            console.log( err );
	            callback('ERROR',null);
	        }
	    });
		});	
		}
	});
	
};



UserDao.prototype.createUser = function(callback, emailID, fname, lname, password, mobileNum){
	var userCount;
	
	 UserModel.count({emailId: emailID}, function(err, emailExists)
	 {
			 if(emailExists == 0){

					UserModel.count(function( err, count ) {
						
						userCount=count+1;
						console.log("The number of users "+userCount);
						var user = new UserModel({
							userId:userCount,
							emailId:emailID,
					        fname: fname,
					        lname: lname,
					        password: password,
					        mobileNum:mobileNum
					    });
						
					    user.save( function( err,users ) {
					        if( !err ) {
					            console.log( 'created'+user );
					            callback( null,user );
					        } else {
					            console.log( err );
					            callback('ERROR',null);
					        }
					    });
						
					});
				 
			 }else{
				 callback('User Already Exits',null);
			 }
	 });
	
	

};
	



UserDao.prototype.removeUser = function (callback, emailID){

	console.log("in remove user" +emailID);
	UserModel.count({emailId: emailID}, function(err, emailExists)
	{
	 if(emailExists == 0){
		 callback('User does not Exits',null);
		 
	 }else{
			UserModel.find({emailId:emailID}).remove(function( err, user ) {
		        
		            if( !err ) {
		            	console.log("no eror"+user.userId);
		                callback(null,user);
		            } else {
		            	console.log(" eror");
		                console.log( err );
		                callback('ERROR',null);
		            }
		        });
		    }
	});
	
}

//db.connection.close();
module.exports = UserDao;


