
var userDao = require("../DatabaseConnections/UserDao");
var userobj = new userDao();

var ejs = require("ejs");

function User() {

}

User.prototype.validateUser = function(callback,request)
{

	console.log("user function ");
	
	userobj.validateUser(function(err,res) {
		callback(err,res);
		
	},request.fname,request.password);

};


User.prototype.viewCustomers = function(callback,request)
{
	
	console.log("view customers function ");
	userobj.viewCustomers(function(err,res) {
		callback(err,res);
		
	});

};

User.prototype.createUser = function(callback,request)
{
	
	console.log("signUp function ");
	userobj.createUser(function(err,res) {
		callback(err,res);
		
	},request.fname,request.lname,request.password);

};


User.prototype.updateUser = function(callback,request)
{
	console.log("Update User function ");
	userobj.updateUser(function(err,res) {
		
		callback(err,res);
		
	},request.fname,request.lname,request.password);

};


User.prototype.remove = function(callback,request){
	
	
	userobj.removeUser(function(err,res){
		callback(err,res);
	},request.fname);
};


module.exports = User;
