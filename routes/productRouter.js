const express = require("express");
const productController = require("../controllers/productController.js");

const productRouter = express.Router();

productRouter.use("/postProduct", productController.postProduct);
productRouter.use("/editProduct", productController.editProduct);
productRouter.use(
	"/editHandlingProduct",
	productController.editHandlingProduct
);
productRouter.use("/removeProduct", productController.removeProduct);
productRouter.use("/create", productController.addProduct);
productRouter.use("/statistics", productController.statistics);
productRouter.use("/store", productController.store);
productRouter.use("/", productController.getProducts);

module.exports = productRouter;
