module.exports = {
	identity: 'creditcard',
	connection: 'postgres',
	attributes: {
		user		: { model : 'user'},
		stripeCustomerId: { type: 'string' },
		brand		: { type: 'string' },
		name		: { type: 'string' },
		exp_month	: { type: 'number' },
		exp_year	: {type: 'number' },
		cvc			: { type: 'number' },
		last4		: {type: 'string' }
	}
}


