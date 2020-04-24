const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const Env = require( "../config/environment");

const usr = Env.mail_user;
const pass = Env.mail_pass;

const transport = nodemailer.createTransport({
  service: 'SendGrid',
    auth: { user: usr, 
    pass: pass },
});

const handlebarOptions = {
  viewEngine: {
    extName: '.hbs',
    partialsDir: path.resolve('./src/resources/mail/'),
    layoutsDir: path.resolve('./src/resources/mail/'),
    defaultLayout: undefined,
  },
  viewPath: path.resolve('./src/resources/mail/'),
  extName: '.hbs',
};
transport.use('compile', hbs(handlebarOptions));

module.exports = transport;