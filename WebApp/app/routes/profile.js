const express   = require('express');
const router    = express.Router();
const checkAuth = require('../middleware/check-auth');

const User = require('../controllers/users');


router.get('/', checkAuth, (req, res) => {
    console.log(`/profile \n\tMiddleware: ${req.decodedUser}`);

    User.searchUser(req.decodedUser)
        .then(data => res.render('profile', {data: data}))
        .catch(err => console.log(err));
});

router.get('/:id', checkAuth, (req, res) => {

    User.searchUser(req.params.id)
        .then(data => res.render('profile', {data: data}))
        .catch(err => console.log(err));
});

module.exports = router;

