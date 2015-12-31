var AdminController = require("../../admin");

var routes = [
	{ method : "post" , path : "/" , action : AdminController.create , role : 'admin' },
	{ method : "post" , path : "/login" , action : AdminController.authenticate , role : 'public' }
]


module.exports = routes;