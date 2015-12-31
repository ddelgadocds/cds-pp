var Admin = require("../storage").Admin(); 
var Authenticator = require("../Authenticator");

module.exports = {
	create 				: create,
	authenticate 		: authenticate,
	logout				: logout
}

function authenticate(req,res){
	Authenticator.authenticate(req,res,Admin);
}

function logout(req,res){
	Authenticator.logout(req,res,Admin);
}

function create(req,res){
	
	Admin.create(req.body,function(err,admin){
		if (err) {
			res.send("Error " + err);	
		}else{
			res.send(admin);	
		}
		
	});

}