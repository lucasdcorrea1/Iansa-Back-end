import jwt from 'jsonwebtoken';

import env from '../../config/environment';
import { buildResponse as Response } from '../response';

class Auth {
  static async generateToken(params) {
    return jwt.sign(params, env.auth.secret, {
      expiresIn: env.auth.expiresIn
    });
  }

  static async authenticateToken(req, res, next) {
    let authorization = req.headers.authorization;
    if (!authorization) {
      authorization = req.query.token;
    }
    if (!authorization) {
      return Response(res, 401, 'Autorização não encontrada.');
    }
    await jwt.verify(authorization, env.auth.secret, (err, decoded) => {
      if (err) {
        return Response(res, 401, 'Token inválido.');
      }
      req.userId = decoded.id;
      return next();
    });
  }
}
export default Auth;
