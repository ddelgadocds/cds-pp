var Express = require('express');
var Nconf = require('nconf');
var Bugsnag = require("bugsnag");
var Router = require("./router.js");
var BodyParser  = require('body-parser');
var Morgan      = require('morgan');

Bugsnag.register("505e80cd5c24d234924c7affb7511c52");

var expressApp = Express();


expressApp.use(Bugsnag.requestHandler); 
module.exports = {
	init: init
};

function init(done) {

	// use body parser so we can get info from POST and/or URL parameters
	expressApp.use(BodyParser.urlencoded({ extended: false }));
	expressApp.use(BodyParser.json());

	expressApp.use(Morgan('dev'));
	
	expressApp.use("/",Router);
	expressApp.use(Express.static(__dirname + '/../../../public')); //point to the public folder
	
	expressApp.use(Bugsnag.errorHandler);

  

	printRoutes(expressApp);
	if (process.env.PORT) {
		expressApp.listen(process.env.PORT, done);
	} else {
		expressApp.listen(Nconf.get('server:port'), done);
	}
}


function printRoutes(app){
	var routes = [];
	app._router.stack.forEach(function(middleware){
	    if(middleware.route){ // routes registered directly on the app
	        routes.push(middleware.route);
	    } else if(middleware.name === 'router'){ // router middleware 
	        middleware.handle.stack.forEach(function(handler){
	            route = handler.route;
	            route && routes.push(route.path);
	        });
	    }
	});
	console.log("Routes : ");
	routes.map(function(route){
		console.log(route);
	})
	
}