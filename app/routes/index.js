// Server Routes
const express = require('express');
const router = express.Router();
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const user = require('../controllers/users');

router.get('/', (req, res) => {
    res.render('login');
});

// @desc    Login user
// @route   POST /login
// @access  Public
router.post('/login', (req, res) => {
    console.log(req.body);
    console.log('login requested');

    // fazer aqui verificação se username e password estão vazios?

    user
        .searchUser(req.body.username)
        .then(data => {
            if (data !== null) {
                bcrypt
                    .compare(req.body.password, data.password)
                    .then(result => {
                        if (!result) console.log('Wrong Password');
                        else {
                            console.log('Valid Password');
                            const token = jwt.sign(
                                {
                                    username: data.username
                                },
                                process.env.JWT_KEY,
                                {
                                    expiresIn: process.env.JWT_EXPIRE
                                },
                                {
                                    algorithm: 'RS256'
                                }
                            );

                            const cookieOptions = {
                                expires: new Date(
                                    Date.now() +
                                    process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
                                ),
                                httpOnly: false
                            };
                            res.cookie('userToken', token, cookieOptions);
                            res.redirect('/feed');
                        }
                    })
                    .catch(err => console.log(err));
            } else {
                console.log(`User with username ${req.body.username} does not exist`);
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

                let userDir = path.join(__dirname, `../public/uploads/${newUser.username}`);
                fs.mkdir(userDir, err => {
                    if(err) console.log(err);
                });
                res.redirect('/');
            } else {
                console.log(`User with username ${req.body.username} already exists`);
            }
        })
        .catch(err => {
            console.log(err);
        });
});

router.post('/forgotpassword', (req, res) => {
    user
        .searchUserEmail(req.body.email)
        .then(data => {
            if (!data) {
                console.log('User com email inserido não existe');
            } else {
                // criar o token de reset
                const resetToken = data.getResetPasswordToken();

                data
                    .save({
                        validateBeforeSave: false
                    })
                    .then(() => {
                        // criar o url de reset da password
                        // Create reset url
                        const resetUrl = `${req.protocol}://${req.get(
                            'host'
                        )}/resetpassword/${resetToken}`;

                        const message = `Este email foi enviado porque foi requirido um reset da password.\nO limite de tempo para poderes realizar é de 20 minutos.\nSe não realizar esta operação neste intervalo de tempo, terá de realizar novo pedido de reset.\nPara completar o processo de reset visite o seguinte link: ${resetUrl}`;

                        try {
                            sendEmail({
                                email: data.email,
                                subject: 'Password reset token',
                                message
                            })
                                .then(() => {
                                    res.status(200).json({
                                        success: true,
                                        data: 'Email sent'
                                    });
                                })
                                .catch();
                        } catch (err) {
                            console.log(err);
                            //caso corra mal, estes campos voltam a undefined
                            data.resetPasswordToken = undefined;
                            data.resetPasswordExpire = undefined;

                            data
                                .save({
                                    validateBeforeSave: false
                                })
                                .then()
                                .catch();

                            console.log('O email não pode ser enviado');
                        }
                    });
            }
        })
        .catch(err => {
            console.log(err);
        });
});

router.put('/resetpassword/:resettoken', (req, res) => {
    // get hashed token
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.resettoken)
        .digest('hex');

    user
        .searchUserQuery({
            resetPasswordToken,
            resetPasswordExpire: {
                $gt: Date.now()
            }
        })
        .then(user => {
            if (!user) {
                console.log('Token inválido');
            } else {
                // dar update da password
                user.password = req.body.password;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpire = undefined;

                user.save().then(() => {
                    console.log('password atualizada com sucesso');
                    const token = jwt.sign(
                        {
                            username: user.username
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: process.env.JWT_EXPIRE
                        },
                        {
                            algorithm: 'RS256'
                        }
                    );

                    const cookieOptions = {
                        expires: new Date(
                            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
                        ),
                        httpOnly: true
                    };
                    res.cookie('userToken', token, cookieOptions);
                    res.redirect('/feed');
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
});

// Export Routes for Index
module.exports = router;
