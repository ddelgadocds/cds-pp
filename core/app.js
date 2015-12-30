var Async = require("async");
var Bugsnag = require("bugsnag");

var loadConfiguration = function(next){
	console.log("Loading configuration");
	if ( process.env.NODE_ENV === undefined ) {
		process.env.NODE_ENV = 'development';
	}
	//register bugsnag
	Bugsnag.register("505e80cd5c24d234924c7affb7511c52");
	
	//load configuration
	require('./config')(process.env.NODE_ENV);

	next();
}
	
var initStorage = function(next){
	console.log("Initializing storage");
	require('./lib/storage').init(next);
}

function basicInit(done){
	init([loadConfiguration,initStorage],done);
}


function init(tasks,done){
	
	Async.waterfall(tasks,function(err){
		if (err) {
			console.log("Error initializing platform : " + err);
		}else{
			console.log("Success initializing platform");
		}
		done();

	})

}

module.exports = {
	basicInit : basicInit
}