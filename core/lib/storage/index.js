var SailsPostgresAdapter = require('sails-postgresql');
var Waterline = require('waterline');
var Nconf = require('nconf');

var _waterline = new Waterline();
var _models = {};

var init = function(cb){

	loadCollections();
	initializeWaterline(cb);

}


var  initializeWaterline = function(cb){
	var waterlineConfig = {
	    adapters: {
	        'postgres': SailsPostgresAdapter,
	    },

	    connections: Nconf.get('connections')
	};


	_waterline.initialize(waterlineConfig, function (err, models) {
		_models = models;
		cb(err);
	})
}

var loadCollections = function(){
	var path = "../../models";
	
	_waterline.loadCollection(Waterline.Collection.extend(require(path+"/company.js")));
	_waterline.loadCollection(Waterline.Collection.extend(require(path+"/address.js")));
	_waterline.loadCollection(Waterline.Collection.extend(require(path+"/person.js")));
	_waterline.loadCollection(Waterline.Collection.extend(require(path+"/productCategory.js")));
	
}

module.exports = {
	init : init,
	models : function(){return _models},
}