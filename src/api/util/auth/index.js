import jwt from 'jsonwebtoken';

import Env from '../../config/environment';
import { buildResponse as Response } from '../responses/base-response';

class Auth {
  static async authenticateToken(req, res, next) {
    let authorization = req.headers.authorization;
    if (!authorization) {
      authorization = req.query.token;
    }
    if (!authorization) {
      return Response(res, 401, 'Autorização não encontrada.');
    }
    await jwt.verify(authorization, Env.auth.secret, (err, decoded) => {
      if (err) {
        return Response(res, 401, 'Token inválido.');
      }
      req.userId = decoded.id;
      return next();
    });
  }

  static async generateToken(params) {
    return jwt.sign(params, Env.auth.secret, { expiresIn: Env.auth.expiresIn });
  }
}
export default Auth;
