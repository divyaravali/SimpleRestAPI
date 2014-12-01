
var user = require('../Model/User');
var offer = require('../Model/Offer');
var ejs = require("ejs");

// hadrcoded value. we need to get the value from session


exports.index = function(req, res){
	res.render('WelcomePage');
  
};

exports.validateUser =function(req,res){
	console.log("validate user");
	var newUser = new user();
	newUser.validateUser(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			res.json(result);
		}

	},req.body);
	
	console.log("Username "+ req.param('userName'));
};


exports.createuser =function(req,res){
	console.log("create user");
	var newUser = new user();
	var a = req.param;
	console.log("a"+ a);
	//newUser.validateUser(req.param('username'), req.param('password'));
	newUser.createUser(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			res.json(result);
		}

	},req.body);
	console.log("Username"+ req.param('userName'));
	console.log("Username"+ req.param('password'));
};



exports.viewCustomers =function(req,res){
	console.log("view customers");
	var newUser = new user();
	
	newUser.viewCustomers(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			res.json(result);
		}

	},req.body);
};




exports.updateuser =function(req,res){
	//req.body.MemberShipID = "937-49-3682";
	console.log("Update user");
	var newUser = new user();
	newUser.updateUser(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			console.log("success");
			res.json(result);
		}

	},req.body);
};



exports.removeUser = function(req,res){
	//var memberTypeID = req.session.name;  //hard code here, should get from user add/update/delete page

	var newUser = new user();
	newUser.remove(function(err,result){
		if(err){
			console.log("remove user error"+err);
			res.json(res.json({"status": err}));
			//throw(err);
		}else{
			//return number of rows that deleted
			console.log("return "+result);
			res.json({"status": "success"});
		}

	}, req.body);

};
//offer related
exports.createoffer =function(req,res){
	console.log("create offer");
	var newOffer = new offer();
	var a = req.param;
	console.log("a"+ a);
	//newUser.validateUser(req.param('username'), req.param('password'));
	newOffer.createOffer(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			res.json(result);
		}

	},req.body);
//	console.log("Username"+ req.param('userName'));
//	console.log("Username"+ req.param('password'));
};


exports.viewOffers =function(req,res){
	console.log("view offers");
	var newOffer = new offer();
	
	newOffer.viewOffers(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			res.json(result);
		}

	},req.body);
};




exports.updateoffer =function(req,res){
	//req.body.MemberShipID = "937-49-3682";
	console.log("Update offer");
	var newOffer = new offer();
	newOffer.updateOffer(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			console.log("success");
			res.json(result);
		}

	},req.body);
};




//Product Related
exports.createProduct =function(req,res){
	
	var newProduct = new Product();
	newProduct.createProduct(function(err,result) {
		if(err){
			console.log("Error"+err);
			//throw(err);
			res.json(err);
		}else
		{
			res.json(result);
		}

	},req.body);
	//console.log("Username"+ req.param('userName'));
	//console.log("Username"+ req.param('password'));
};
