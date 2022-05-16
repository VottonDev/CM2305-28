const mysql = require('mysql');

// MySQL credentials and create connection
const mysql_config = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

mysql_config.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  // Debug message to see if connected to database
  // console.log('connected as id ' + mysql_config.threadId);
});

module.exports = mysql_config;
