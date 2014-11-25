
var mongoose = require('mongoose');
var db = mongoose.connect("mongodb://localhost:27017/nodetest2");

var UserSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    password: String
})
var UserModel = mongoose.model( 'User', UserSchema );



function UserDao() {
	
}




UserDao.prototype.validateUser = function(callback, fname, password){
	
	//
	//console.log("USERNAME: " + username + " Password: " + password);
	
	
	
	UserModel.find({fname:fname},function( err, users ) {
		callback(err, users);
    });
	//connection.end();
	
	
};




UserDao.prototype.viewCustomers = function(callback, username, password){
	
	
		UserModel.find(function( err, users ) {
			callback(err, users);
	    });

	
	
};

UserDao.prototype.updateUser = function(callback, fname, lname, password){
	
	
	
	
	UserModel.find({fname:fname},function( err, users ) {
		 users.fname = fname;
	       users.lname=  lname;
	        users.password =  password;
	        
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
	
	    
	

	
	
};



UserDao.prototype.createUser = function(callback, fname, lname, password){
	
	
	var user = new UserModel({
        fname: fname,
        lname: lname,
        password: password
    });
	 
	    user.save( function( err,users ) {
	        if( !err ) {
	            console.log( 'created' );
	            callback( null,user );
	        } else {
	            console.log( err );
	            callback('ERROR',null);
	        }
	    });
	

};
	






UserDao.prototype.removeUser = function (callback, fname){

	UserModel.find({fname:fname}).remove(function( err, user ) {
        
            if( !err ) {
                callback(null,user);
            } else {
                console.log( err );
                callback('ERROR',null);
            }
        });
    };





module.exports = UserDao;


