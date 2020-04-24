const jwt = require("jsonwebtoken");

const Env = require("../config/environment");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).send({
      error: "No token provided"
    });

  jwt.verify(authHeader, Env.auth, (err, decoded) => {
    if (err)
      return res.status(401).send({
        error: "Token invalid"
      });

    req.userId = decoded.id;
    return next();
  });
  return null;
};
