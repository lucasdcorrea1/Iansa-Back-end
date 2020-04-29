import jwt from "jsonwebtoken";

import Env from "../../config/environment";

class Auth {
  static AuthenticateMiddleware(req, res, next) {
    const authorization = req.headers.authorization;
    if (!authorization)
      return res.status(401).send({
        error: "authorization not found"
      });

    jwt.verify(authorization, Env.auth.secret, (err, decoded) => {
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
export default Auth.AuthenticateMiddleware;
