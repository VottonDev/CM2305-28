const express = require('express');
const app = express();
const compression = require('compression')
const auth = require('./routes/auth.js');
const twitter = require('./routes/twitter.js');
const flickr = require('./routes/flickr.js');
const port = 3001;

app.use(compression())

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});

app.use('/api', auth);
app.use('/api', twitter);
app.use('/api', flickr);

module.exports = app;