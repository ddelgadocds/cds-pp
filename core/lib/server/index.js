var Express = require('express');
var Nconf = require('nconf');
var Bugsnag = require("bugsnag");
var Router = require("./router.js");

Bugsnag.register("505e80cd5c24d234924c7affb7511c52");

var expressApp = Express();


expressApp.use(Bugsnag.requestHandler); 
module.exports = {
	init: init
};

function init(done) {
  expressApp.use("/",Router);
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