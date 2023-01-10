const express = require("express");
const Controller = require("../controllers/categories");
const router = express.Router();


router.get("/", Controller.categoryList);
router.get("/:id", Controller.categoryById);


router.post("/", Controller.addCategory);
router.put("/:id", Controller.editCategory);
router.delete("/:id", Controller.deleteCategory);

module.exports = router;