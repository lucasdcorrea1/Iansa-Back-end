import crypto from 'crypto';

import bcrypt from 'bcryptjs';

import emailService from '../../util/email/email.service';
import EMAIL_MESSAGE_TYPES from '../../util/email/email.types';
import Auth from '../../util/auth';
import env from '../../config/environment';
import userDao from './user.dao';
import { buildResponse as Response } from '../../util/responses/base-response';

class UserController {
  static async registerUser(req, res) {
    try {
      const name = req.body.name.trim();
      const email = req.body.email.trim();
      const password = req.body.password;

      const existingUser = await userDao.get({ email });
      if (existingUser) {
        return Response(res, 400, 'E-mail já cadastrado.');
      }

      const user = await userDao.post({ name, email, password });
      const token = await Auth.generateToken({ id: user.id });
      const link = 'https://google.com';

      await emailService.sendMail(
        email,
        EMAIL_MESSAGE_TYPES.VERIFY_EMAIL,
        name,
        link
      );
      return Response(res, 201, 'Usuário cadastrado com sucesso.', {
        token
      });
    } catch (error) {
      return Response(res, 500, `Erro ao cadastrar usuário: ${error}.`);
    }
  }

  static async authenticateUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userDao.get({ email: email.trim() });

      if (!user) {
        return Response(res, 400, 'Usuário ou senha inválidos.');
      }
      if (!(await bcrypt.compare(password.trim(), user.password))) {
        return Response(res, 400, 'Usuário ou senha inválidos.');
      }

      const token = await Auth.generateToken({ id: user.id });

      return Response(res, 200, 'Usuário autenticado com sucesso.', {
        name: user.name,
        email: user.email,
        token
      });
    } catch (error) {
      return Response(res, 500, `Erro ao autenticar usuário: ${error}.`);
    }
  }

  static async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const user = await userDao.get({ email: email.trim() });

      if (!user) {
        return Response(res, 400, 'Usuário não encontrado.');
      }

      const passwordResetToken = crypto.randomBytes(20).toString('hex');
      const passwordResetExpires = new Date().setHours(
        new Date().getHours() + 1
      );
      await userDao.put(user.id, {
        $set: {
          passwordResetToken,
          passwordResetExpires
        }
      });

      const { name } = user;
      const token = await Auth.generateToken({ id: user.id });
      const link = `${env.app.url}/resetpassword?token=${token}&passwordResetToken=${passwordResetToken}`;

      await emailService.sendMail(
        email,
        EMAIL_MESSAGE_TYPES.FORGOT_PASSWORD,
        name,
        link
      );
      return Response(res, 200, `E-mail enviado para: ${email}`);
    } catch (error) {
      return Response(res, 500, `Erro ao solicitar troca de senha: ${error}.`);
    }
  }

  static async resetPassword(req, res) {
    try {
      const { email, password } = req.body;
      const { passwordResetToken } = req.query;
      const user = await userDao.get({ email: email.trim() });

      if (!user) {
        return Response(res, 400, 'Usuário inválido.');
      }
      if (passwordResetToken.trim() !== user.passwordResetToken) {
        return Response(res, 400, 'Token inválido.');
      }
      if (!new Date() > user.passwordResetExpires) {
        return Response(res, 400, 'Token expirado.');
      }
      if (await bcrypt.compare(password.trim(), user.password)) {
        return Response(res, 400, 'Utilize uma senha diferente da atual.');
      }

      await userDao.putPasswrd(user, password);
      return Response(res, 200, 'Senha atualizada com sucesso.');
    } catch (error) {
      return Response(res, 500, `Erro ao resetar senha: ${error}.`);
    }
  }
}

export default UserController;
