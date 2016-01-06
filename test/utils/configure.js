var Async = require('async');
var App = require('../../core/app.js');
var Storage = require('../../core/lib/storage')

before(function(done) {
	
	var tasks = [
		
		App.basicInit, //need to connect before cleaning database
		cleanDB, //clean testing database
        App.basicInit
	];

	Async.series(tasks, done);
});

after(function(done) {
	
	var tasks = [
		function(next) {
			//clean testing database
			cleanDB(next);
            
			
		}
	];

	Async.series(tasks, done);
});


function cleanDB(next){
    var db = Storage.getConnection();
	if (!db) {
        return next();
    };
    db.drop(function(){
        Storage.clearConnection();
        next();
    });
}