module.exports = {
	identity: 'person',
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
		addresses				: { collection: 'address', via  : 'person' },
		role					: { type: 'string', required: true }
	}
}
