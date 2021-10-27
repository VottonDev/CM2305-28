const mysql = require('mysql');

const mysql_config = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

module.exports = mysql_config;