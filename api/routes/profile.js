const express = require('express');
const app = express();
const db = require('../inc/db.js');

// Change password
app.post('/change_password', (req, res) => {
    let new_password = req.body.new_password;
    let confirm_password = req.body.confirm_password;

    if (new_password != confirm_password) {
        res.send({
            status: false,
            message: 'Password and Confirm Password do not match'
        });
    } else {
        // Use bcrypt to hash the password and store it in the database instead of plain text password
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(new_password, salt);

        db.query('UPDATE users SET password = ? WHERE username = ?', [hash, username], (err) => {
            if (err) {
                res.send({
                    status: false,
                    message: 'Error updating password'
                });
            } else {
                res.send({
                    status: true,
                    message: 'Password updated successfully'
                });
            }
        });
    }
});

// Change email address
app.post('/change_email', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let new_email = req.body.new_email;

    db.query('SELECT * FROM Users WHERE username = ?', [username], (err, result) => {
        if (err) {
            return res.status(500).send({
                success: false,
                message: err
            });
        }
        if (result.length == 0) {
            return res.status(403).send({
                success: false,
                message: 'User not found'
            });
        } else {
            bcrypt.compare(password, result[0].password, (err, result) => {
                if (err) {
                    return res.status(500).send({
                        success: false,
                        message: err
                    });
                }
                if (result == false) {
                    return res.status(403).send({
                        success: false,
                        message: 'Password is incorrect'
                    });
                } else {
                    db.query('UPDATE Users SET email = ? WHERE username = ?', [new_email, username], (err) => {
                        if (err) {
                            return res.status(500).send({
                                success: false,
                                message: err
                            });
                        } else {
                            return res.status(200).send({
                                success: true,
                                message: 'Email changed successfully'
                            });
                        }
                    });
                }
            });
        }
    });
});

// Change username 
app.post('/change_username', (req, res) => {
    let username = req.body.username;
    
    db.query('SELECT * FROM Users WHERE username = ?', [username], (err, result) => {
        if (err) {
            return res.status(500).send({
                success: false,
                message: err
            });
        }
        if (result.length == 0) {
            return res.status(403).send({
                success: false,
                message: 'User not found'
            });
        } else {
            db.query('UPDATE Users SET username = ?', [username], (err) => {
                if (err) {
                    return res.status(500).send({
                        success: false,
                        message: err
                    });
                } else {
                    return res.status(200).send({
                        success: true,
                        message: 'Username changed successfully'
                    });
                }
            });
        }
    });
});


module.exports = app;