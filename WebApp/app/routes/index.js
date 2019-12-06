// Server Routes
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const user = require('../controllers/users');


router.get('/', (req, res) => {
    console.log(req.params);
    res.render('login');
});

router.post('/login', (req, res) => {
    console.log(req.body);

    user.searchUser(req.body.username)
        .then(data => {
            if(data !== null )
                res.render('feed');
            else
                res.render('login');
        })
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