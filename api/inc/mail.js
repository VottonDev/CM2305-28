const nodemailer = require('nodemailer');

// Set SMTP transport credentials
let transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
    ciphers: 'SSLv3',
  },
});

function sendEmail(email, subject, text) {
  let mailOptions = {
    from: '',
    to: email,
    subject: subject,
    text: text,
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
  sendEmail: sendEmail,
};
