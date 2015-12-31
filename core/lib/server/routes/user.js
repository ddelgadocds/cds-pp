var UserController = require("../../user");

var routes = [
	{ method : "post" , path : "/" , action : UserController.create , role : 'admin' },
	{ method : "post" , path : "/login" , action : UserController.authenticate , role : 'public' }
]


module.exports = routes;