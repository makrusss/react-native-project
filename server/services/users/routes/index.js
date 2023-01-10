const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/", (req, res) => {
  res.send("Hello world");
});
router.get("/users", userController.fetchUsers);
router.post("/users", userController.addUser);
router.get("/users/:id", userController.fetchUserById);
router.delete("/users/:id", userController.delUserById);

module.exports = router;
