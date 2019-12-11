// Server Routes
const express   = require('express');
const router    = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const user      = require('../controllers/users');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    console.log(req.body);
    console.log("login requested");
    user.searchUser(req.body.username)
        .then(data => {
            if(data !== null ) {

                bcrypt.compare(req.body.password, data.password)
                    .then(result => {
                        if(!result)
                            console.log("Wrong Password");
                        else {
                            console.log("Valid Password");
                            const token = jwt.sign({
                                username: data.username
                            }, process.env.JWT_KEY, { expiresIn: "1h"}, {algorithm: "RS256"});

                            const cookieOptions = {
                                httpOnly: true
                            };

                            res.cookie('userToken', token, cookieOptions);
                            res.redirect('/feed');
                        }
                    });
            }
            else
                res.redirect('/');
        })
        .catch(err => console.log(err));
});

router.post('/register', (req, res) => {
    user.searchUser(req.body.username)
        .then(data => {
            if(data === null) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err) console.log(err);
                    const newUser = {
                        username: req.body.username,
                        fullName: req.body.name,
                        password: hash
                    };

                    console.log(newUser);

                    user.addNew(newUser)
                        .then(result => console.log(result))
                        .catch(err => console.log(err));
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
});

// Export Routes for Index
module.exports = router;