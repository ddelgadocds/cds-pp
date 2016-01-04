var CompanyController = require("../../company");

var routes = [
	{ method : "get" , path : "/" , action : CompanyController.get , role : "client" },
	{ method : "post" , path : "/" , action : CompanyController.create , role : "admin" }
]


module.exports = routes;