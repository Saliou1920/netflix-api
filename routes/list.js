const express = require("express");
const router = express.Router();
const { createList, deleteList, getlists } = require("../controllers/list");

router.route("/").post(createList).get(getlists);
router.route("/:id").delete(deleteList);

module.exports = router;
