var Company = require("../storage").Company(); 

module.exports = {
	get : get,
	create : create
}


function get (req,res){
	res.send("Here I will return aaalll the companies");
}

function create(req,res){
	
	Company.create(req.body,function(err,company){
		if (err) {
			res.send("internal error " + err);	
		}else{
			res.send(company);	
		}
		
	});

}