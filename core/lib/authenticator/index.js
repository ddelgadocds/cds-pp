var Nconf = require('nconf');
var jwt    = require('jsonwebtoken');
var crypto = require('crypto');

module.exports = {
	ensureAuthenticated : ensureAuthenticated,
	encryptPassword : encryptPassword,
	makeSalt : makeSalt,
	authenticate : authenticate,
	logout	: logout
}


function ensureAuthenticated(role,req,res,next){

	var Storage = require("../storage");
	var models = {
		"admin" : Storage.Admin(),
		"client" : Storage.User(),
	}

	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	// decode token
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, Nconf.get("secretKey"), function(err, loggedUser) {      
			
			if (err) {
				return res.status(403).send("invalid token : " + err);   
			} else {
				
				var model = models[role];
				//need to check if this token was not expired
				model.findOne({id : loggedUser.id},function(err,user){
					if (err) {
						return res.status(500).send("internal error : " + err);
					};
					if (!user) {
						return res.status(403).send("invalid token");
					};
					if (tokenIsValid(user,token)) {
						// if everything is good, save to request for use in other routes
						req.loggedUser = loggedUser;
						req.token = token;   
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

function encryptPassword(password,salt){
	return crypto.createHmac('sha1', salt).update(password).digest('base64');
}

function makeSalt(password,salt){
	return Math.round(new Date().valueOf() * Math.random()) + '';
}

function authenticate(req,res,model){
	var email = req.body.email;
	var password = req.body.password;
	if (!email) {
		return res.status(400).send("must provide email");
	};
	if (!password) {
		return res.status(400).send("must provide password");
	};

	model.findOne({email : email},function(err,user){
		if (err) {
			return res.status(500).send("internal error : " + err);
		}
		if (!user) {
			return res.status(401).send("user not found");
		}
		if (!user.verifyPassword(password)) {
			return res.status(401).send("invalid password");	
		};
		var basicUser = user.toBasicObject();
		
		var token = jwt.sign(basicUser, Nconf.get("secretKey"));

        user.tokens.push(token);

        user.save(function(err,user){
        	if (err) {
				return res.status(500).send("internal error : " + err);
			}
			res.send({user : basicUser , token : token})
        })

		
		
	})
}

function logout(req,res,model){
	
	model.findOne({id : req.loggedUser.id},function(err,user){
		if (err) {
			return res.status(500).send("internal error : " + err);
		};
		if (!user) {
			return res.status(403).send("invalid token");
		};

		var remainingTokens = user.tokens.filter(function(token){
			return req.token != token;
		})

		user.tokens = remainingTokens;

		user.save(function(err){
			if (err) {
				res.status(500).send(err);	
			};

			res.send("OK");

			
		})

	})




	
}



