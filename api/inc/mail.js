const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    secure: true,
    auth: {
        user: 'postmaster@sandboxe732894598d74d4186370f1b1314af5e.mailgun.org',
        pass: '9fe0aa66a914978f4334870419826a8b-c3d1d1eb-2235ab4c'
    }
});

function sendEmail(email, subject, text) {
    let mailOptions = {
        from: '',
        to: email,
        subject: subject,
        text: text
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    sendEmail: sendEmail
}