module.exports = {
	identity: 'order',
	connection: 'postgres',
	attributes: {
		user		: { model : 'user' },
		cart 		: { model : 'cart'},
		company 	: { model : 'company' },
		agency		: { model : 'agency' },
		appKey		: { type: 'string' },
		number 		: { type: 'string' },
		created 	: { type: 'date' },
		subTotal	: { type: 'number' },
		tax			: { type: 'number' },
		orderTotal	: { type: 'number' },
		status		: { type: 'string',	enum: ['received', 'processing', 'shipped', 'completed', 'cancelled', 'PROOF SENT', 'PROOF REJECTED','PROOF APPROVED'],	defaultsTo : 'processing'},
		comment		: { type: 'string'}
	}
}


