var Nconf = require('nconf');
var jwt    = require('jsonwebtoken');
var Storage = require("../storage");
var models = {
	"admin" : Storage.Admin(),
	"client" : Storage.User(),
}


function authenticate(role,req,res,next){
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	// decode token
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, Nconf.get("secretKey"), function(err, loggedUser) {      
			
			if (err) {
				return res.status(403).send("invalid token");   
			} else {
				
				var model = models[role];

				//need to check if this token was not expired
				
				model.findOne({id : loggedUser.id},function(err,user){
					if (err) {
						return res.status(500).send("internal error : " + err);
					};
					if (!user) {
						return res.status(401).send("user not found");
					};
					
					if (tokenIsValid(user,token)) {
						// if everything is good, save to request for use in other routes
						req.loggedUser = loggedUser;    
						next();
					}else{
						return res.status(403).send("invalid token");
					}
					
				})
			}
		});

	} else {

		// if there is no token
		// return an error
		return res.status(403).send("no token provided");

	}
}

function tokenIsValid(user,targetToken){
	var filtered = [];
	filtered = user.tokens.filter(function(token){
		return token == targetToken;
	})
	return filtered.length > 0;
}

module.exports = {
	authenticate : authenticate
}