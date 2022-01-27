const express = require("express");
const router = express.Router();
const {
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserStats,
} = require("../controllers/user");

router.route("/find/:id").get(getUserById).patch(updateUser).delete(deleteUser);
router.route("/").get(getAllUsers);
router.route("/stats").get(getUserStats);

module.exports = router;
