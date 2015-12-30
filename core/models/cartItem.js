module.exports = {
	identity: 'cartItem',
	connection: 'postgres',
	attributes: {
		name 		: 'string',
		product		: { model : 'product' ,required : true },
		order		: { model : 'order' },
		quantity	: {type : 'number', required : true},
		price		: {type : 'number', required : true},
		delivery	: 'string',
		toShip		: 'string',
		isFulfilled	: { type : 'boolean',defaultsTo : false },
		employee 	: { model : 'person' },
		shippingAddress : {model : 'address'},
		thumbnail	: 'string',
		status		: { type : 'string', enum: ['approve', 'reject', 'delegate', 'processing', 'received'], defaultsTo: 'received'},
		toShip		: 'string',
		vendor 		: 'string' ,
		vendorProductId:  'string' ,
		vendorResponse:  'string' ,
		assetUrl	:  'string' ,
		vendorOrderId:  'string' ,
		trackingNumber: 'string' ,
		trackingCarrier: 'string' ,
		trackingUrl	: 'string' ,
		shipDate	: 'date',
		proofFileUrl: 'string'
		//Need to add variants
	}
}