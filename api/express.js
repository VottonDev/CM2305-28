require('dotenv').config();
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const limiter = require('express-rate-limit');
const app = express();
const auth = require('./routes/auth.js');
const profile = require('./routes/profile.js');
const twitter = require('./routes/twitter.js');
const flickr = require('./routes/flickr.js');
const mail = require('./routes/mail.js');

// Whitelist what IPs can access the API
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

// Ratelimit requests
const ip_limiter = new limiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(compression());

if (process.env.NODE_ENV === 'production') {
  app.use(cors(corsOptions));
  app.use(ip_limiter);
}

app.use('/auth', auth);
app.use('/profile', profile);
app.use('/twitter', twitter);
app.use('/flickr', flickr);
app.use('/mail', mail);

module.exports = app;
