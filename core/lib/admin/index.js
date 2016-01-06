var Admin = require("../storage").getModel("admin"); 

var Authenticator = require("../authenticator");

module.exports = {
	create 				: create,
	authenticate 		: authenticate,
	logout				: logout,
	loginAsUser			: loginAsUser
}

function authenticate(req,res){
	Authenticator.authenticate(req,res,Admin);
}

function logout(req,res){
	Authenticator.logout(req,res,Admin);
}
function loginAsUser(req,res){
	
	Authenticator.loginAsUser(req,res);

}
function create(req,res){
	
	Admin.create(req.body,function(err,admin){
		if (err) {
			res.send("internal error " + err);	
		}else{
			res.send(admin);	
		}
		
	});

}