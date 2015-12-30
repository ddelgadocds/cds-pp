module.exports = {
	identity: 'productcategory',
	connection: 'postgres',
	attributes: {
		name : 'string',
		isArchived : 'boolean',
		company : { model : 'Company' }
	}
}
