const List = require("../models/List");
const { UnauthenticatedError, BadRequestError } = require("../errors/index");
const { StatusCodes } = require("http-status-codes");

const createList = async (req, res) => {
  if (!req.user.isAdmin) {
    throw new UnauthenticatedError("You can't create a list");
  }
  const list = await List.create(req.body);
  res.status(StatusCodes.CREATED).json({ list });
};

const deleteList = async (req, res) => {
  if (!req.user.isAdmin) {
    throw new UnauthenticatedError("You can't delete a list");
  }
  const list = await List.findByIdAndDelete(req.params.id);
  if (!list) {
    throw new BadRequestError("List not found");
  }
  res.status(StatusCodes.OK).json({ message: "List deleted" });
};

const getlists = async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];

  try {
    if (!typeQuery && !genreQuery) {
      const lists = await List.aggregate([{ $sample: { size: 10 } }]);
      return res.status(StatusCodes.OK).json({ lists });
    }
    if (typeQuery && genreQuery) {
      const lists = await List.find({
        $and: [{ type: typeQuery }, { genre: genreQuery }],
      });
      return res.status(StatusCodes.OK).json({ lists });
    }
    if (typeQuery) {
      const lists = await List.find({ type: typeQuery });
      return res.status(StatusCodes.OK).json({ lists });
    }
  } catch (err) {
    throw new BadRequestError("List not found");
  }
};

module.exports = {
  createList,
  deleteList,
  getlists,
};
