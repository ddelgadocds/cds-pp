module.exports = {
	identity: 'company',
	connection: 'postgres',
	attributes: {
		name : 'string',
		employmentCount : 'integer',
		isArchived : 'boolean',
		notes : 'string',
		logoUrl : 'string',
		contacts : 'array',
		addresses: {
	      collection: 'address',
	      via  : 'company'
	    },
	    productCategories: {
	      collection: 'productCategory',
	      via  : 'company'
	    }

	}
}
