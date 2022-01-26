const User = require("../models/User");
const { UnauthenticatedError, BadRequestError } = require("../errors/index");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new BadRequestError("User already exists");
  }
  const newUser = await User.create(req.body);
  const token = newUser.createToken();
  res.status(StatusCodes.CREATED).json({ user: { name: newUser.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Email and Password are required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid email or password");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new UnauthenticatedError("Invalid Password");
  }
  const token = user.createToken();
  res.status(StatusCodes.OK).json({ user: { user }, token });
};

module.exports = {
  register,
  login,
};
