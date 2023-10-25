const Product = require("../models/product.js");

exports.addProduct = function (request, response) {
	response.render("createProduct.hbs");
};

exports.statistics = function (request, response) {
	let result = { orderQuantity: 0, weight: 0 };
	Product.find({}, function (err, product) {
		if (err) {
			console.log(err);
			response.status(400);
		}
		for (let obj of product) {
			result.weight += obj.nettoWeight;
		}
		result.orderQuantity = product.length;
		response.render("statistics.hbs", result);
	});
};

exports.store = function (request, response) {
	response.render("store.hbs");
};

exports.editProduct = function (request, response) {
	if (!request.body) return response.status(400);
	const productId = request.body.id;
	Product.findById(productId, function (err, item) {
		if (err) return console.log(err);
		response.render("editProduct.hbs", item);
	});
};

//Редагування продукту
exports.editHandlingProduct = function (request, response) {
	if (!request.body) return response.status(400);
	const productId = request.body.id;

	const OrderDispatchDate = request.body.dispatchDate;
	const OrderCustomer = request.body.customer;
	const OrderOrderNumber = request.body.orderNumber;
	const OrderOrderDate = request.body.orderDate;
	const OrderPlaceOfDelivery = request.body.placeOfDelivery;
	const OrderNettoWeight = request.body.nettoWeight;
	const OrderPrice = request.body.price;
	const OrderIncoterms = request.body.incoterms;
	const OrderPaymentDelay = request.body.paymentDelay;
	const OrderTransporter = request.body.transporter;
	const OrderFreight = request.body.freight;
	const OrderPlateNumbers = request.body.plateNumbers;

	Product.findByIdAndUpdate(
		productId,
		{
			dispatchDate: OrderDispatchDate,
			customer: OrderCustomer,
			orderNumber: OrderOrderNumber,
			orderDate: OrderOrderDate,
			placeOfDelivery: OrderPlaceOfDelivery,
			nettoWeight: OrderNettoWeight,
			price: OrderPrice,
			incoterms: OrderIncoterms,
			paymentDelay: OrderPaymentDelay,
			transporter: OrderTransporter,
			freight: OrderFreight,
			plateNumbers: OrderPlateNumbers,
		},
		function (err, allProducts) {
			if (err) {
				console.log(err);
				response.status(400);
			}
			response.redirect("/products");
		}
	);
};

//Видалення продукту
exports.removeProduct = function (request, response) {
	if (!request.body) return response.status(400);
	const productId = request.body.id;
	Product.findByIdAndDelete(productId, function (err, prod) {
		if (err) return console.log(err);
		console.log("Видалено продукт:" + prod);
	});
	response.redirect("/products");
};

exports.getProducts = function (request, response) {
	Product.find({}, function (err, allProducts) {
		if (err) {
			console.log(err);
			response.status(400);
		}
		response.render("products.hbs", {
			products: allProducts,
		});
	});
};

exports.postProduct = function (request, response) {
	if (!request.body) return response.status(400);
	const OrderDispatchDate = request.body.dispatchDate;
	const OrderCustomer = request.body.customer;
	const OrderOrderNumber = request.body.orderNumber;
	const OrderOrderDate = request.body.orderDate;
	const OrderPlaceOfDelivery = request.body.placeOfDelivery;
	const OrderNettoWeight = request.body.nettoWeight;
	const OrderPrice = request.body.price;
	const OrderIncoterms = request.body.incoterms;
	const OrderPaymentDelay = request.body.paymentDelay;
	const OrderTransporter = request.body.transporter;
	const OrderFreight = request.body.freight;
	const OrderPlateNumbers = request.body.plateNumbers;
	const product = new Product({
		dispatchDate: OrderDispatchDate,
		customer: OrderCustomer,
		orderNumber: OrderOrderNumber,
		orderDate: OrderOrderDate,
		placeOfDelivery: OrderPlaceOfDelivery,
		nettoWeight: OrderNettoWeight,
		price: OrderPrice,
		incoterms: OrderIncoterms,
		paymentDelay: OrderPaymentDelay,
		transporter: OrderTransporter,
		freight: OrderFreight,
		plateNumbers: OrderPlateNumbers,
	});
	product.save(function (err) {
		if (err) return console.log(err);
		response.redirect("/products");
	});
};
