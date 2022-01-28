const express = require("express");
const router = express.Router();

const {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieById,
  randomMovie,
  getAllMovies,
} = require("../controllers/movie");

router.route("/random").get(randomMovie);
router.route("/").post(createMovie).get(getAllMovies);
router.route("/:id").get(getMovieById).patch(updateMovie).delete(deleteMovie);

module.exports = router;
