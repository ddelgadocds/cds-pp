module.exports = {
	identity: 'cart',
	connection: 'postgres',
	attributes: {
		user 		: { model : 'user' },
		items		: { collection: 'cartItem', via  : 'id'},
		status		: {	type: 'string',	enum: ['active', 'inactive'],defaulsTot: 'active'},
		appKey		: { type: 'string' },
		card 		: { model: 'creditCard' },
		shippingAddress: { model : 'address'}
		
	}
}
