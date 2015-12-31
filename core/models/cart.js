module.exports = {
	identity: 'cart',
	connection: 'postgres',
	attributes: {
		user 		: { model : 'user' },
		items		: { collection: 'cartItem', via  : 'name'},
		status		: {	type: 'string',	enum: ['active', 'inactive'],defaulsTot: 'active'},
		appKey		: { type: 'string' },
		card 		: { model: 'creditCard' }, // not a ref to CreditCard collection because we need to persist before we can save the card
		shippingAddress: { model : 'address'}
		
	}
}
