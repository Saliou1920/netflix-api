const User = require("../models/User");
const { BadRequestError } = require("../errors/index");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

const updateUser = async (req, res) => {
  const {
    user: { _id: userId },
    params: { id },
  } = req;
  if (userId.toString() !== id && !req.user.isAdmin) {
    console.log("userId", userId.toString());
    throw new BadRequestError("You can't update other users");
  }
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  const updatedUser = await User.findByIdAndUpdate({ _id: userId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ user: updatedUser });
};

const deleteUser = async (req, res) => {
  const {
    user: { _id: userId },
    params: { id },
  } = req;
  if (userId.toString() !== id && !req.user.isAdmin) {
    throw new BadRequestError("You can't delete other users");
  }
  const deletedUser = await User.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({ user: deletedUser });
};

const getAllUsers = async (req, res) => {
  if (!req.user.isAdmin) {
    throw new BadRequestError("You can't get all users");
  }
  const query = req.query.new;
  console.log("query", query);
  const users = query ? await User.find().limit(10) : await User.find();
  res.status(StatusCodes.OK).json({ users });
};

const getUserById = async (req, res) => {
  if (!req.user.isAdmin) {
    throw new BadRequestError("You can't get all users");
  }
  const user = await User.findById(req.params.id);
  res.status(StatusCodes.OK).json({ user });
};
module.exports = {
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
};
