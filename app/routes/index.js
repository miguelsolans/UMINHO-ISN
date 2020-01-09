// Server Routes
const express = require('express');
const router = express.Router();
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const user = require('../controllers/users');

router.get('/', (req, res) => {
    res.render('login');
});

// @desc    Login user
// @route   POST /login
// @access  Public
router.post('/login', (req, res) => {
    console.log(req.body);
    console.log("login requested");

    // fazer aqui verificação se username e password estão vazios?

    user.searchUser(req.body.username)
        .then(data => {
            if (data !== null) {

                bcrypt.compare(req.body.password, data.password)
                    .then(result => {
                        if (!result)
                            console.log("Wrong Password");
                        else {
                            console.log("Valid Password");
                            const token = jwt.sign({
                                username: data.username
                            }, process.env.JWT_KEY, {
                                expiresIn: process.env.JWT_EXPIRE
                            }, {
                                algorithm: "RS256"
                            });

                            const cookieOptions = {
                                expires: new Date(
                                    Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
                                httpOnly: true
                            };
                            res.cookie('userToken', token, cookieOptions)
                            res.redirect('/feed');
                        }
                    }).catch(err => console.log(err));
            } else {
                console.log(`User with username ${req.body.username} does not exist`)
                res.redirect('/');
            }
        })
        .catch(err => console.log(err));
});

// @desc    Register user
// @route   POST /register
// @access  Public
router.post('/register', (req, res) => {
    user.searchUser(req.body.username)
        .then(data => {
            if (data === null) {
                const newUser = {
                    username: req.body.username,
                    fullName: req.body.name,
                    password: req.body.password,
                    email: req.body.email

                };

                console.log(newUser);

                user.addNew(newUser)
                    .then(result => console.log(result))
                    .catch(err => console.log(err));

                res.redirect('/login')

            } else {
                console.log(`User with username ${req.body.username} already exist`)
            }
        })
        .catch(err => {
            console.log(err);
        });
});

// Export Routes for Index
module.exports = router;