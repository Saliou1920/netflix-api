const express = require("express");
const router = express.Router();
const {
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
} = require("../controllers/user");

router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);
router.route("/").get(getAllUsers);

module.exports = router;
