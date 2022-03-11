const express = require("express");
const routerApi = require(".");
const routes = express.Router();
const productSchema = require("../models/product");

/* POST 
Endpoint: http://localhost:3000/api/v1/products/product */
routes.post("/product", (req, res) => {
  const product = productSchema(req.body);
  product
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

/* GET 
Endpoint: http://localhost:3000/api/v1/products */
routes.get("/", (req, res) => {
  productSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

/* GET 
Endpoint: http://localhost:3000/api/v1/products/parametro */
routes.get("/:productId", (req, res) => {
  const { productId } = req.params;
  productSchema
    .findById(productId)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

/* PUT
Endpoint: http://localhost:3000/api/v1/products/parametro */
routes.put("/:productId", (req, res) => {
  const { productId } = req.params;
  const {
    product,
    image,
    price,
    available = { available_state, stock },
  } = req.body;
  productSchema
    .updateOne(
      { _id: productId },
      { $set: { product, image, price, available} }
    )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

/* DELETE */
routes.delete("/:productId", (req, res) => {
  const { productId } = req.params;
  productSchema
    .deleteOne({ _id: productId })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


module.exports = routes;
