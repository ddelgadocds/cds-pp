var express = require('express');
var router = express.Router();
var Authenticator = require("../Authenticator");

var setRoutes = function(model,routes){
	for(var i in routes){
		var route = routes[i];
		router[route.method]("/"+model+route.path,roleBasedMiddleware[route.role],route.action);
	}
}


// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });

var roleBasedMiddleware = {
	admin : function(req,res,next){
		Authenticator.ensureAuthenticated("admin",req,res,next);
	},
	client : function(req,res,next){
		Authenticator.ensureAuthenticated("client",req,res,next);
	},
	public : function(req,res,next){
		next();
	}
}


var adminRoutes 	= require("./routes/admin.js");
var companyRoutes 	= require("./routes/company.js");
var userRoutes 	= require("./routes/user.js");

setRoutes('admin',adminRoutes);
setRoutes('company',companyRoutes);
setRoutes('user',userRoutes);



module.exports = router;