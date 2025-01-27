const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const UnAuthorised = require("../error_ctrl/UnAuthorised");

// middleware to authenticate user before accessing protected routes
const Auth = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer")) {
    throw new UnAuthorised("you are not authorised to access this page.");
  }
  const token = auth.split(" ")[1];
  if (token) {
    try {
      const payload = jwt.verify(token, process.env.SECRET_KEY);
      req.user = payload.id;
      next();
    } catch (error) {
      throw new UnAuthorised("Authorization failed.");
    }
    if (!token) {
      throw new UnAuthorised("Expired or invalid token");
    }
  } else {
    throw new UnAuthorised("Expired or invalid token");
  }
};

module.exports = Auth;
