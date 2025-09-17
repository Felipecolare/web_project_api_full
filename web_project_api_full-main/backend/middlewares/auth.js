const jwt = require("jsonwebtoken");
const ForbiddenError = require("../errors/forbiddenError");
require("dotenv").config();

const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(new ForbiddenError().statusCode).send({ message: "Recurso negado" });
  }

  const token = authorization.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(new ForbiddenError().statusCode).send({ message: "Recurso negado" });
  }

  req.user = payload;

  next();
};

module.exports = auth;
