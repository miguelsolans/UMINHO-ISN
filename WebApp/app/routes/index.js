// Server Routes
const express = require('express');
const router = express.Router();

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
    console.log(req.body);
    user.searchUser(req.body.username)
        .then(data => {
            if(data === null) {
                user.addNew(req.body)
                    .then(data => {
                        console.log("Success");
                        console.log(data);
                    }).catch(err => console.log(err));
            }
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
});


// Export Routes for Index
module.exports = router;