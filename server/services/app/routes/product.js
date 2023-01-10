const express = require("express");
const Controller = require("../controllers/products");
const router = express.Router();

router.get("/", Controller.ProductsList);
router.get("/:id", Controller.ProductById);


router.post("/", Controller.createProduct);
router.put("/:id", Controller.editProduct);
router.delete("/:id", Controller.deleteProduct);

module.exports = router;