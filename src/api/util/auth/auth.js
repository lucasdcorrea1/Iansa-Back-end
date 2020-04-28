import jwt from "jsonwebtoken";

import Env from "../../config/environment";

class Auth {
  static AuthMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).send({
        error: "authorization not found"
      });

    jwt.verify(authHeader, Env.auth.secret, (err, decoded) => {
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
  }
}
export default Auth.AuthMiddleware;
