var CompanyController = require("../../company");

var routes = [
	{ method : "get" , path : "/" , action : CompanyController.get , role : "admin" },
	{ method : "post" , path : "/" , action : CompanyController.create , role : "admin" }
]


module.exports = routes;