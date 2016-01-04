module.exports = {
	identity: 'product',
	connection: 'postgres',
	attributes: {
		internalId		: { type: 'string' },
		agency			: { model : 'agency' , required : true},
		company 		: { model : 'company', required : true	},
		name			: {	type: 'string',	required: true},
		type 			: { type: 'string', required: true,enum: ['Individual', 'Corporate', 'Corporate Gift']},
		category 		: { model : 'productCategory'},
		numberOfFiles	: { type: 'number' },
		height 			: { type: 'number' },
		heightUnit 		: { type: 'string', enum: ['in', 'cm', 'px', ''] },
		width 			: { type: 'number' },
		displayPriority : { type: 'number', defaultsTo: 50 },
		widthUnit 		: { type: 'string', enum: ['in', 'cm', 'px', ''] },
		vendor 			: { type: 'string' },
		vendorProductId : { type: 'string' },
		notes 			: { type: 'string' },
		created			: { type: 'date'},
		updated			: { type: 'date' },
		isArchived 		: { type: 'boolean', defaultsTo: false },
		status			: {	type: 'string', enum: ['draft', 'published', 'deleted'], defaultsTo: 'draft' },
		variants 		: { collection: 'productVariant', via  : 'id'}
		// thumbnailImage: {
		// 	filename: { type: String },
		// 	friendlyFilename: { type: String }
		// },
		// previewImage: {
		// 	filename: { type: String },
		// 	friendlyFilename: { type: String }
		// },
		// template: {
		// 	type: String,
		// 	set: function(v) {
		// 		if (v !== this.template) {
		// 			this._isTemplateDirty = true;
		// 		}
		// 		return v;
		// 	}
		// },		
		// prices: [
		// 	{
		// 		qty: { type: 'number' },
		// 		price: { type: 'number' },
		// 		shippingOptions: [{
		// 			name: { type: 'string' },
		// 			price: {type: 'number' },
		// 			days: {type: 'number' }
		// 		}]
		// 	}
		// ],
		// fields: [
		// 	{
		// 		name: { type: String },
		// 		default: { type: String },
		// 		editable: { type: Boolean }
		// 	}
		// ],
		// assets: [
		// 	{
		// 		user: { type: Types.ObjectId, ref: 'Person' },
		// 		filename: { type: String },
		// 		friendlyFilename: { type: String },
		// 		label: { type: String, enum: ['Front', 'Back'] }
		// 	}
		// ],
	
	}
}


