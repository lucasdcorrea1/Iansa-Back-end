const jwt = require("jsonwebtoken");

const Env = require("../../config/environment");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).send({
      error: "authorization not found"
    });

  jwt.verify(authHeader, Env.auth, (err, decoded) => {
    if (err)
      return res.status(401).send({
        error: "invalid token"
      });

    req.userId = decoded.id;
    return next();
  });
  return res.status(401).send({
    error: "invalid token"
  });
};
