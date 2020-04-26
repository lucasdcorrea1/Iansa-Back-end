import jwt from "jsonwebtoken";

import Env from "../../config/environment";

class JWTServices {
  static async generateToken(params) {
    return jwt.sign(params, Env.auth, {
      expiresIn: 43200
    });
  }

  static async validateToken(token) {
    let valid = true;

    jwt.verify(token, Env.auth, err => {
      if (err) {
        valid = false;
      }
    });
    return !!valid;
  }
}

export default JWTServices;
