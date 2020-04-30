import crypto from "crypto";

import bcrypt from "bcryptjs";

import jwt from "../../util/auth/jwt";
import env from "../../config/environment";
import userRepository from "./user.dao";
import emailService from "../../util/email/email.service";
import EMAIL_MESSAGE_TYPES from "../../util/email/email.types";
import {
  okResponse,
  badRequestResponse,
  errorResponse
} from "../../util/responses/base-response";

class UserController {
  static async registerUser(req, res) {
    try {
      const name = req.body.name.trim();
      const email = req.body.email.trim();
      const password = req.body.password;

      const existingUser = await userRepository.get({ email });
      if (existingUser) {
        return badRequestResponse(res, "E-mail já cadastrado.");
      }

      const user = await userRepository.post({ name, email, password });
      const token = await jwt.generateToken({
        id: user.id
      });
      const link = "https://google.com";

      await emailService.sendMail(
        email,
        EMAIL_MESSAGE_TYPES.VERIFY_EMAIL,
        name,
        link
      );
      return okResponse(res, "Usuário cadastrado com sucesso.", {
        token
      });
    } catch (error) {
      return errorResponse(res, `Erro ao cadastrar usuário: ${error}.`);
    }
  }

  static async authenticateUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userRepository.get({ email: email.trim() });

      if (!user) {
        return badRequestResponse(res, "Usuário ou senha inválidos.");
      }
      if (!(await bcrypt.compare(password.trim(), user.password))) {
        return badRequestResponse(res, "Usuário ou senha inválidos.");
      }

      const token = await jwt.generateToken({
        id: user.id
      });

      return okResponse(res, "Usuário autenticado com sucesso.", {
        name: user.name,
        email: user.email,
        token
      });
    } catch (error) {
      return errorResponse(res, `Erro ao autenticar usuário: ${error}.`);
    }
  }

  static async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const user = await userRepository.get({ email: email.trim() });

      if (!user) {
        return badRequestResponse(res, "Usuário não encontrado.");
      }

      const passwordResetToken = crypto.randomBytes(20).toString("hex");
      const passwordResetExpires = new Date().setHours(
        new Date().getHours() + 1
      );
      await userRepository.put(user.id, {
        $set: {
          passwordResetToken,
          passwordResetExpires
        }
      });

      const { name } = user;
      const token = await jwt.generateToken({ id: user.id });
      const link = `${env.app.url}/resetpassword?token=${token}&passwordResetToken=${passwordResetToken}`;

      await emailService.sendMail(
        email,
        EMAIL_MESSAGE_TYPES.FORGOT_PASSWORD,
        name,
        link
      );
      return okResponse(res, `E-mail enviado para: ${email}`);
    } catch (error) {
      return errorResponse(res, `Erro ao solicitar troca de senha: ${error}.`);
    }
  }

  static async resetPassword(req, res) {
    try {
      const { email, password } = req.body;
      const { passwordResetToken } = req.query;
      const user = await userRepository.get({ email: email.trim() });

      if (!user) {
        return badRequestResponse(res, "Usuário inválido.");
      }
      if (passwordResetToken.trim() !== user.passwordResetToken) {
        return badRequestResponse(res, "Token inválido.");
      }
      if (!new Date() > user.passwordResetExpires) {
        return badRequestResponse(res, "Token expirado.");
      }
      if (await bcrypt.compare(password.trim(), user.password)) {
        return badRequestResponse(res, "Utilize uma senha diferente da atual.");
      }

      await userRepository.putPasswrd(user, password);
      return okResponse(res, "Senha atualizada com sucesso.");
    } catch (error) {
      return errorResponse(res, `Erro ao resetar senha: ${error}.`);
    }
  }
}

export default UserController;
