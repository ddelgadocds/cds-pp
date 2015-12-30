module.exports = {
	identity: 'address',
	connection: 'postgres',
	attributes: {
		name : 'string',
		line1: 'string',
		line2: 'string',
		city: 'string',
		state: 'string',
		zip: 'string',
		country: 'string',
		isDefault: { type : 'boolean',defaultsTo : false },
		company : { model : 'Company' }
	
	}
}
