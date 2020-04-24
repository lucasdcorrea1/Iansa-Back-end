const crypto = require("crypto");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authRepository = require("./auth-repository");
const jwtService = require("../../helpers/jwtServices");
const mailer = require("../../modules/mailer");
const Env = require("../../config/environment");

module.exports = {
  async authenticate(req, res) {
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
  },

  async authenticateToken(req, res) {
    const { token } = req.body;

    jwt.verify(token, Env.auth, err => {
      if (err) return res.status(401).send(JSON.stringify("NO"));

      return res.status(200).send(JSON.stringify("OK"));
    });
  },

  async forgotPassword(req, res) {
    const { email } = req.body;
    const user = await authRepository.get({ email: email.trim() });
    try {
      if (!user)
        return res.status(400).send({ error: "Usuário não encontrado!" });

      const token = crypto.randomBytes(20).toString("hex");
      const { name } = user;

      const now = new Date();
      now.setHours(now.getHours() + 1);
      await authRepository.put(user.id, {
        $set: {
          passwordResetToken: token,
          passwordResetExpires: now
        }
      });

      mailer.sendMail(
        {
          to: `${user.email}`,
          bc: Env.gmail_user,
          from: '"IANSA" <ti@iansa.org.br>',
          subject: `Ei, ${name}, você precisa alterar sua senha?`,
          template: "auth/forgotPassword",
          context: {
            name,
            link: `${
              Env.app_url
            }resetpassword?token=${await jwtService.generateToken({
              id: user.id
            })}&passtoken=${token}`
          }
        },
        err => {
          // eslint-disable-next-line no-console
          if (err) console.log(err.message);
        }
      );
      return res.json({
        sucess: `Enviamos o token de autorização para o e-mail ${email}`
      });
    } catch (error) {
      return res.status(400).send({
        error: `Erro ao solicitar troca de senha ${error}`
      });
    }
  },

  async resetPassword(req, res) {
    const { email, password } = req.body;
    const { passtoken } = req.headers;
    const token = req.headers.authorization;

    // eslint-disable-next-line no-console
    console.log(passtoken);
    // eslint-disable-next-line no-console
    console.log(token);

    try {
      if ((await jwtService.validateToken(token)) === false) {
        return res.status(401).send({
          message: "Invalid token!"
        });
      }

      const user = await authRepository.getUserReset({ email: email.trim() });
      const now = new Date();

      if (!user) {
        return res.status(400).send({
          error: "Usuário inválido!"
        });
      }

      if (passtoken.trim() !== user.passwordResetToken) {
        return res.status(400).send({
          error: "Passtoken inválido!"
        });
      }

      if (!now > user.passwordResetExpires) {
        return res.status(400).send({
          error: "Passtoken expirado!"
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
};
