import crypto from "crypto";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import authRepository from "../user/user.dao";
import jwtService from "../../util/auth/jwtServices";
import emailService from "../../util/email/email.service";
import Env from "../../config/environment";
import EMAIL_MESSAGE_TYPES from "../../util/email/email.types";

class AuthController {
  static async authenticate(req, res) {
    const { email, password } = req.body;

    const user = await authRepository.getUserAuth({ email: email.trim() });

    if (!user)
      return res.status(400).send({
        error: "Usuário ou senha inválidos!"
      });

    if (!(await bcrypt.compare(password.trim(), user.password)))
      return res.status(400).send({
        error: "Usuário ou senha inválidos!"
      });

    const token = await jwtService.generateToken({
      id: user.id
    });

    return res.status(200).send({
      token,
      name: user.name,
      email: user.email
    });
  }

  static async authenticateToken(req, res) {
    const { token } = req.body;
    jwt.verify(token, Env.auth.secret, err => {
      if (err) return res.status(401).send(JSON.stringify("NO"));
      return res.status(200).send(JSON.stringify("OK"));
    });
  }

  static async forgotPassword(req, res) {
    const { email } = req.body;
    const user = await authRepository.get({ email: email.trim() });
    try {
      if (!user)
        return res.status(400).send({ error: "Usuário não encontrado!" });

      const token = crypto.randomBytes(20).toString("hex");
      const now = new Date();
      now.setHours(now.getHours() + 1);
      await authRepository.put(user.id, {
        $set: {
          passwordResetToken: token,
          passwordResetExpires: now
        }
      });

      const { name } = user;
      const link = `${
        Env.app.url
      }resetpassword?token=${await jwtService.generateToken({
        id: user.id
      })}&passtoken=${token}`;

      await emailService.sendMail(
        email,
        EMAIL_MESSAGE_TYPES.FORGOT_PASSWORD,
        name,
        link
      );

      return res.json({
        sucess: `Enviamos o token de autorização para o e-mail ${email}`
      });
    } catch (error) {
      return res.status(400).send({
        error: `Erro ao solicitar troca de senha ${error}`
      });
    }
  }

  static async resetPassword(req, res) {
    const { email, password } = req.body;
    const { passtoken } = req.headers;
    try {
      const user = await authRepository.getUserReset({ email: email.trim() });
      const now = new Date();

      if (!user) {
        return res.status(400).send({
          error: "Usuário inválido!"
        });
      }

      if (passtoken.trim() !== user.passwordResetToken) {
        return res.status(400).send({
          error: "Token inválido!"
        });
      }

      if (!now > user.passwordResetExpires) {
        return res.status(400).send({
          error: "Token expirado!"
        });
      }

      if (await bcrypt.compare(password.trim(), user.password)) {
        return res.status(400).send({
          error: "Utilize uma senha diferente da atual!"
        });
      }

      await authRepository.putPasswrd(user, password);
      user.password = undefined;

      return res
        .status(200)
        .send(JSON.stringify("Senha atualizada com sucesso!"));
    } catch (error) {
      res.status(400).send({
        error: `Erro ao resetar senha: ${error}`
      });
    }
    return res.status(500).send(JSON.stringify("Erro ao atualizar senha"));
  }
}
export default AuthController;
