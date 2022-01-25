const User = require("../models/User");
const { UnauthenticatedError } = require("../errors/index");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new UnauthenticatedError("No authorization token");
  }
  const token = authorization.replace("Bearer ", "");
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId);
    if (!user) {
      throw new UnauthenticatedError("Invalid token");
    }
    req.user = user;
    next();
  } catch (err) {
    throw new UnauthenticatedError("Invalid token");
  }
};

module.exports = authenticate;
