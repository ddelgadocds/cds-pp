var Authenticator = require("../lib/authenticator");

module.exports = {
	identity: 'user',
	connection: 'postgres',
	attributes: {
		company 				: { model : 'Company' },
		firstName				: { type: 'string', required: true },
		lastName				: { type: 'string', required: true },
		phone					: 'string',
		cell					: 'string',
		tokens					: { type: 'array',defaultsTo : []},
		email					: { type: 'string', required: true},
		isArchived				: 'boolean',
		defaultShippingAddress	: { model : 'address' },
		role					: { type: 'string' },
		gender					: { type: 'string', enum: [ 'male', 'female', 'other' ] },
		created					: { type: 'date' },
		lastLogin 				: { type: 'date' },
		lastLoginDate			: { type: 'date' },
		lastProjectStartedDate 	: { type : 'date'},
		lastProjectStartedByPMDate : {type : 'date'},
		paypalEmail				: { type: 'string' },
		isActive				: { type: 'boolean', default: true }, // for PMs this is manually set by a toggle in the admin, for Clients it's calculated and not stored
		lastContacted			: { type: 'date' },
		stripeBankTokenId		: { type: 'string' },
		stripeNameOnBankAccount	: { type: 'string' },
		assignedLast			: { type: 'boolean', default: false },
		avatarUrl				: { type: 'string' },
		isFromCsv				: {	type: 'boolean', default : false},
		hasToChangePassword 	: { type: 'boolean', default: false },
		salt 					: { type: 'string' },
		companiesWithAccessTo	: { collection: 'company', via  : 'id' },
		addresses				: { collection: 'address', via  : 'id' },
		password 				: { type: 'string', required: true,  minLength: 6,  maxLength: 50  },
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
		// notifications: {
		// 	review: {
		// 		email: Boolean,
		// 		text: Boolean
		// 	},
		// 	message: {
		// 		email: Boolean,
		// 		text: Boolean
		// 	}
		// },
	beforeCreate: function (attrs, cb) {
    	attrs.salt = Authenticator.makeSalt();
    	attrs.password = Authenticator.encryptPassword(attrs.password,attrs.salt);
    	cb();
  	}
}
