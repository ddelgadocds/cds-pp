var AdminController = require("../../admin");

var routes = [
	{ method : "post" , path : "/" , action : AdminController.create , role : 'admin' },
	{ method : "post" , path : "/login" , action : AdminController.authenticate , role : 'public' },
	{ method : "post" , path : "/logout" , action : AdminController.logout , role : 'admin' },
	{ method : "post" , path : "/loginAsUser" , action : AdminController.loginAsUser , role : 'admin' }
]


module.exports = routes;