const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
	dispatchDate: String,
	customer: String,
	orderNumber: String,
	orderDate: String,
	placeOfDelivery: String,
	nettoWeight: Number,
	price: Number,
	incoterms: String,
	paymentDelay: Number,
	transporter: String,
	freight: Number,
	plateNumbers: String,
});

module.exports = mongoose.model('Product', productSchema)

