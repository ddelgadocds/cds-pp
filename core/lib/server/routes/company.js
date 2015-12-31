var CompanyController = require("../../company");

var routes = [
	{ method : "get" , path : "/" , action : CompanyController.get , role : "admin" }
]


module.exports = routes;