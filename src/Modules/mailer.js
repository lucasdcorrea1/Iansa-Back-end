'use strict'

const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

require('dotenv/config');
const host = process.env.MAIL_HOST;
const port = process.env.MAIL_PORT;
const usr = process.env.MAIL_USER;
const pass = process.env.MAIL_PASS;
const ssl = true;

const transport = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  tls: {
     ciphers:'SSLv3'
  },
  auth: {
      user: usr,
      pass: pass
  }
});

const handlebarOptions = {
  viewEngine: {
    extName: '.hbs',
    partialsDir: path.resolve('./src/Resources/Mail/'),
    layoutsDir: path.resolve('./src/Resources/Mail/'),
    defaultLayout: undefined,
  },
  viewPath: path.resolve('./src/Resources/Mail/'),
  extName: '.hbs',
};
transport.use('compile', hbs(handlebarOptions));

module.exports = transport;