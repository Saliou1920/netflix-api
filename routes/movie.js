const express = require("express");
const router = express.Router();

const {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieById,
  randomMovie,
} = require("../controllers/movie");

router.route("/").post(createMovie);
router.route("/:id").get(getMovieById).patch(updateMovie).delete(deleteMovie);
router.route("/random").get(randomMovie);

module.exports = router;
