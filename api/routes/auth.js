const express = require('express');
const app = express();
const db = require('../inc/db.js');
const bcrypt = require('bcrypt');

// Register an account
app.post('/register', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let confirm = req.body.confirm;
    let hash = bcrypt.hash(password, 10);
        if (password !== confirm) {
        return res.send({
            success: false,
            message: 'Passwords do not match'
        });
    }
        // Store the password hash
        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (err, result) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error registering user'
                });
            }
            // Send the response
            return res.send({
                success: true,
                message: 'User registered'
            });
        });
    });

// Login to account
app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            res.send('Error logging in.');
        } else {
            if (results.length == 0) {
                res.send('Account not found.');
            } else {
                if (bcrypt.compareSync(password, results[0].password)) {
                    req.session.user = results[0];
                    res.send('Succesfully logged in.');
                } else {
                    res.send('Password is incorrect.');
                }
            }
        }
    });
});

// Logout from account.
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('Successfully logged out.');
});

// Check if user is logged in.
app.get('/check_login', (req, res) => {
    if (req.session.user) {
        res.send(req.session.user);
    } else {
        res.send('false');
    }
});


module.exports = app;