var orm = require("orm");
var transaction = require("orm-transaction");
var Nconf = require('nconf');

var connection = null;

var connect = function (cb) {
  
  var connectionUrl = getConnectionUrl();
  console.log("connectionUrl "+ connectionUrl);
  orm.connect(connectionUrl, function (err, db) {
    if (err){
        console.log(err);
        return cb(err);
    }
    console.log("Creating a new postgres connection");
    db.use(transaction);
    connection = db;

    var path = "../../models";
     //Load models

    
    require(path+"/address.js")(orm, db);
    require(path+"/employee.js")(orm, db);
    
    db.sync(function(err) {
        return cb();
    })
    
  });

};

var getConnection = function() {
    return connection;
}
var clearConnection = function(){
    connection = null;
}

var getModel = function(model){
    return connection.models[model];
}

function getConnectionUrl(){

    var postgresConf = Nconf.get("connections:postgres");

    return "postgres://"+postgresConf.user+":"+postgresConf.password+"@"+postgresConf.host+"/"+postgresConf.database;
}

module.exports = {
    connect : connect,
    getConnection : getConnection,
    clearConnection : clearConnection,
    getModel : getModel

}
