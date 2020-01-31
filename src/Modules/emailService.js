'use strict';
const config = require('../Config/emailConfig');
const sendgrid = require('sendgrid')(config.sendgridKey);

exports.send = async (to, subject, body) => {
    sendgrid.send({
        to: to,
        from: 'lucas.dcorrea1@gmail.com',
        subject: subject,
        html: body
    });
};