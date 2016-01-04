var express = require('express');
var router = express.Router();
var Authenticator = require("../authenticator");


/*** Centralized method to add a route to the router and set its middleware***/

/*

Example :

If we call setRoutes("company",
					[
						{ method : "get" , path : "/" , action : CompanyController.get , role : "client" },
						{ method : "get" , path : "/:id" , action : CompanyController.getByUserId , role : "client" },
						{ method : "post" , path : "/:id" , action : CompanyController.createCompany , role : "admin" }
					])

we are doing this :

router.get("/company/",Autenthicator.ensureAuthenticated('client',req,res,next),CompanyController.get);

router.get("/company/:id",Autenthicator.ensureAuthenticated('client',req,res,next),CompanyController.getByUserId);

router.post("/company/",Autenthicator.ensureAuthenticated('admin',req,res,next),CompanyController.createCompany);

*/




var setRoutes = function(model,routes){
	for(var i in routes){
		var route = routes[i];
		router[route.method]("/"+model+route.path,roleBasedMiddleware[route.role],route.action);
	}
}



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