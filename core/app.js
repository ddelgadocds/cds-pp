var Async = require("async");

var loadConfiguration = function(next){
	console.log("Loading configuration");
	if ( process.env.NODE_ENV === undefined ) {
		process.env.NODE_ENV = 'development';
	}
	
	//load configuration
	require('./config')(process.env.NODE_ENV);
    next();
}
	
var initStorage = function(next){
	console.log("Initializing storage");
	require('./lib/storage').connect(next);
}

var initServer = function(next){
	console.log("Initializing restful server");
	require('./lib/server').init(next);
}

function basicInit(done){
	init([loadConfiguration,initStorage],done);
}

function initRestfulServer(done){
	init([loadConfiguration,initStorage,initServer],done);
}


function init(tasks,done){
	
	Async.waterfall(tasks,function(err){
		if (err) {
			console.log("Error initializing platform : " + err);
		}
		done(err);

	})

}

module.exports = {
	basicInit : basicInit,
	initRestfulServer : initRestfulServer
}