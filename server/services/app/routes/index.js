const express = require("express");
const router = express.Router();
const product = require("./product");
const category = require("./category");

const errorHandler = require("../middlewares/errorHandler");

router.get("/", (req, res) => {
  res.send("Hello world");
});
router.use("/products", product);
router.use("/categories", category);

router.use(errorHandler);

module.exports = router;
