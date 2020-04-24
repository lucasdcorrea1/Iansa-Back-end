const jwt = require("jsonwebtoken");

const Env = require("../config/environment");

module.exports = {
  async generateToken(params) {
    return jwt.sign(params, Env.auth, {
      expiresIn: 43200
    });
  },
  async validateToken(token) {
    let valid = true;

    jwt.verify(token, Env.auth, err => {
      if (err) {
        valid = false;
      }
    });
    return !!valid;
  }
};
