var CompanyController = require("../../company");

var routes = [
	{ method : "get" , path : "/" , action : CompanyController.get }
]


module.exports = routes;