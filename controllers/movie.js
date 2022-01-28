const Movie = require("../models/Movie");
const { StatusCodes } = require("http-status-codes");
const { notFound, badRequest } = require("../errors");

const createMovie = async (req, res) => {
  if (!req.user.isAdmin) {
    throw new badRequest("You are not admin");
  }
  const movie = await Movie.create(req.body);
  res.status(StatusCodes.CREATED).json({ movie });
};

const updateMovie = async (req, res) => {
  if (!req.user.isAdmin) {
    throw new badRequest("You are not admin");
  }
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!movie) {
    throw new notFound("Movie not found");
  }
  res.status(StatusCodes.OK).json({ movie });
};

const deleteMovie = async (req, res) => {
  if (!req.user.isAdmin) {
    throw new badRequest("You are not admin");
  }
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) {
    throw new notFound("Movie not found");
  }
  res.status(StatusCodes.OK).json({ message: "Movie deleted" });
};

const getMovieById = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    throw new notFound("Movie not found");
  }
  res.status(StatusCodes.OK).json({ movie });
};

const randomMovie = async (req, res) => {
  const type = req.query.type;
  if (type !== "series") {
    const movie = await Movie.aggregate([
      { $match: { isSeries: false } },
      { $sample: { size: 1 } },
    ]);
    res.status(StatusCodes.OK).json({ movie });
  }
  const movie = await Movie.aggregate([
    { $match: { isSeries: true } },
    { $sample: { size: 1 } },
  ]);
  res.status(StatusCodes.OK).json({ movie });
};

const getAllMovies = async (req, res) => {
  if (!req.user.isAdmin) {
    throw new badRequest("You are not admin");
  }
  const query = req.query.limit;
  const movies = query ? await Movie.find().limit(query) : await Movie.find();
  res.status(StatusCodes.OK).json({ movies });
};
module.exports = {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieById,
  randomMovie,
  getAllMovies,
};
