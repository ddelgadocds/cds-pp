var CompanyController = require("../../company");

var routes = [
	{ method : "get" , path : "/" , action : CompanyController.get , role : "client" }
]


module.exports = routes;