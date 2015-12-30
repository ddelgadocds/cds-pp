var express = require('express');
var router = express.Router();

var setRoutes = function(model,routes){
	for(var i in routes){
		var route = routes[i];
		router[route.method]("/"+model+route.path,route.action);
	}
}


// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });

var companyRoutes = require("./routes/company.js");

setRoutes('company',companyRoutes);



module.exports = router;