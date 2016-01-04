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
		assignedLast			: { type: 'boolean', default: false },
		avatarUrl				: { type: 'string' },
		isFromCsv				: {	type: 'boolean', default : false},
		hasToChangePassword 	: { type: 'boolean', default: false },
		salt 					: { type: 'string' },
		password 				: {	type: 'string', required: true},
		companiesWithAccessTo	: { collection: 'company', via  : 'id' },
		addresses				: { collection: 'address', via  : 'id' },
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
		}
}
// set: function(password) {
// 				this.salt = this.makeSalt();
// 				return this.encryptPassword(password);
// 			}