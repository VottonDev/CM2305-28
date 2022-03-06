const express = require('express');
const app = express();
const db = require('../inc/db.js');

// Change password
app.post('/change_password', (req, res) => {
    let username = req.body.username;
    let old_password = req.body.old_password;
    let new_password = req.body.new_password;
    let confirm_password = req.body.confirm_password;

    if (new_password !== confirm_password) {
        return res.status(400).send({
            success: false,
            message: 'Passwords do not match'
        });
    } else {
        db.query('SELECT * FROM Users WHERE username = ? OR email = ?', [username, username], (err, result) => {
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
                bcrypt.compare(old_password, result[0].password, (err, result) => {
                    if (err) {
                        return res.status(500).send({
                            success: false,
                            message: err
                        });
                    }
                    if (result == false) {
                        return res.status(403).send({
                            success: false,
                            message: 'Old password is incorrect'
                        });
                    } else {
                        bcrypt.hash(new_password, 10, (err, hash) => {
                            if (err) {
                                return res.status(500).send({
                                    success: false,
                                    message: err
                                });
                            } else {
                                db.query('UPDATE Users SET password = ? WHERE username = ? OR email = ?', [hash, username, username], (err) => {
                                    if (err) {
                                        return res.status(500).send({
                                            success: false,
                                            message: err
                                        });
                                    } else {
                                        return res.status(200).send({
                                            success: true,
                                            message: 'Password changed successfully'
                                        });
                                    }
                                });
                            }
                        });
                    }
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

module.exports = app;