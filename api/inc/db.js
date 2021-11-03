const mysql = require('mysql');

const mysql_config = mysql.createConnection({
  host: 'csmysql.cs.cf.ac.uk',
  user: 'c2050462',
  password: 'Hello12345',
  database: 'c2050462_cm2305',
});

module.exports = mysql_config;
