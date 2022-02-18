const express = require('express');
const app = express();
const mail = require('../inc/mail.js');

// Send email route
app.post('/send_email', (req, res) => {
    let email = req.body.email;
    let subject = req.body.subject;
    let text = req.body.text;

    mail.sendEmail(email, subject, text);
    res.status(200).send({
        success: true,
        message: 'Email sent'
    });
});

module.exports = app;
