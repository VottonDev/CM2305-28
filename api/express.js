const express = require('express');
const app = express();
const compression = require('compression')

const port = 3001;

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});

module.exports = app;