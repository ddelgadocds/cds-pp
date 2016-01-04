
var Authenticator = require("../lib/authenticator");

module.exports = {
	identity: 'admin',
	connection: 'postgres',
	attributes: {
		firstName			: { type: 'string', required: true },
		lastName			: { type: 'string', required: true },
		tokens				: { type: 'array',defaultsTo : []},
		email				: { type: 'string', required: true, unique: true },
		password:{
	      type: 'string',
	      required: true,
	      minLength: 6,
	      maxLength: 50
	    },
	    privileges : 'array',
	    isFromCsv : {type : 'boolean' , default : false},
	    salt : 'string',
	    verifyPassword: function (password) {
			return Authenticator.encryptPassword(password,this.salt) === this.password;
    	},
    	toBasicObject : function(){
    		return {
    			id : this.id,
    			firstName : this.firstName,
    			lastName : this.lastName
    		}
    	}
	},
	beforeCreate: function (attrs, cb) {
    	attrs.salt = Authenticator.makeSalt();
    	attrs.password = Authenticator.encryptPassword(attrs.password,attrs.salt);
    	cb();
  	}
}

