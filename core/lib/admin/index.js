var Admin = require("../storage").Admin(); 
var jwt    = require('jsonwebtoken');
var Nconf = require("nconf");

module.exports = {
	create 				: create,
	authenticate 		: authenticate
}

function authenticate(req,res){
	var email = req.body.email;
	var password = req.body.password;
	if (!email) {
		return res.status(400).send("must provide email");
	};
	if (!password) {
		return res.status(400).send("must provide password");
	};

	Admin.findOne({email : email},function(err,admin){
		if (err) {
			return res.status(500).send("internal error : " + err);
		}
		if (!admin) {
			return res.status(401).send("user not found");
		}
		if (!admin.verifyPassword(password)) {
			return res.status(401).send("invalid password");	
		};
		var basicAdmin = admin.toBasicObject();
		
		var token = jwt.sign(basicAdmin, Nconf.get("secretKey"));

        admin.tokens.push(token);

        admin.save(function(err,admin){
        	if (err) {
				return res.status(500).send("internal error : " + err);
			}
			res.send({admin : basicAdmin , token : token})
        })

		
		
	})
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