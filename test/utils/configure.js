var Async = require('async');
var App = require('../../core/app.js');

before(function(done) {
	
	var tasks = [
		function(next) {
			App.basicInit(next); //need to connect before cleaning database
		},
		cleanDB //clean testing database
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
	var Storage = require('../../core/lib/storage');
	var models = Storage.models();
	if (!models || !models.collections) {
		return next();
	};
	Async.each(models.collections,function(model,nextIt){
		model.drop(nextIt);
	},next)
	
}