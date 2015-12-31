module.exports = {
	identity: 'agency',
	connection: 'postgres',
	attributes: {
		name 		: { type: 'string' },
		contactName	: { type: 'string' },
		contactEmail: { type: 'string' },
		contactPassword: { type: 'string' },
		contactPhone: { type: 'string' },
		address 	: { type: 'string' },
		address2	: { type: 'string' },
		city		: { type: 'string' },
		state		: { type: 'string' },
		zip			: { type: 'string' },
		country		: { type: 'string' },
		website		: { type: 'string' },
		employmentCount: { type: 'number' },
		isArchived	: { type: 'boolean', defaultsTo: false }
	}
}


