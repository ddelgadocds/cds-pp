var User = require("../storage").getModel("user");
var Authenticator = require("../authenticator");

module.exports = {
	create 				: create,
	authenticate 		: authenticate,
	logout				: logout
}

function authenticate(req,res){
	Authenticator.authenticate(req,res,User);
}

function logout(req,res){
	Authenticator.logout(req,res,User);
}

function create(req,res){
	
	User.create(req.body,function(err,user){
		if (err) {
			res.send("internal error " + err);	
		}else{
			res.send(user);	
		}
		
	});

}