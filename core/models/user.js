module.exports = {
	identity: 'user',
	connection: 'postgres',
	attributes: {
		company 				: { model : 'Company' },
		firstName				: { type: 'string', required: true },
		lastName				: { type: 'string', required: true },
		phone					: 'string',
		cell					: 'string',
		email					: { type: 'string', required: true},
		isArchived				: 'boolean',
		defaultShippingAddress	: { model : 'address' },
		role					: { type: 'string', required: true ,enum: [ 'client', 'community designer', 'LW designer', 'developer', 'copy writer', 'pm', 'employee', 'admin'] },
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
		assignedLast			: { type: 'boolean', default: false }, // only used for a couple pms for the round robin assignment
		avatarUrl				: { type: 'string' },
		isFromCsv				: {	type: 'boolean', default : false},
		hasToChangePassword 	: { type: 'boolean', default: false },
		salt 					: { type: 'string' }

		//addresses				: { collection: 'address', via  : 'person' },
		// companiesWithAccessTo	: [{ type: Types.ObjectId, ref: 'Company' }],
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
		
		

		// addresses: [{
		// 	name: { type: String },
		// 	line1: { type: String },
		// 	line2: { type: String },
		// 	city: { type: String },
		// 	state: { type: String },
		// 	zip: { type: String },
		// 	country: {type: String }
		// }],
		
		// password: {
		// 	type: String,
		// 	required: 'password is required',
		// 	set: function(password) {
		// 		this.salt = this.makeSalt();
		// 		return this.encryptPassword(password);
		// 	}
		// },
		
		}
}
