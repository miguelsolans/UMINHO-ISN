const express   = require('express');
const router    = express.Router();
const checkAuth = require('../middleware/check-auth');
const axios     = require('axios');

const User = require('../controllers/users');


router.get('/', checkAuth, (req, res) => {
    console.log(`/profile \n\tMiddleware: ${req.decodedUser}`);

    User.searchUser(req.decodedUser)
        .then(data => res.render('profile', {data: data}))
        .catch(err => console.log(err));
});

router.get('/:username', checkAuth, function (req, res, next) {
    let one = `${process.env.APP_URL}/api/user/${req.params.username}`;
    let two = `${process.env.APP_URL}/api/userpost/feed/${req.params.username}`;

    const requestOne = axios.get(one, {
        headers: {
            Cookie: `userToken=${req.cookies.userToken}`
        }
    });
    const requestTwo = axios.get(two, {
        headers: {
            Cookie: `userToken=${req.cookies.userToken}`
        }
    });

    axios.all([requestOne, requestTwo])
        .then(axios.spread((...responses) => {
            const data = responses[0].data;
            const postsUser = responses[1].data;
            console.log(postsUser)
            res.render('profile', {
                data: data,
                postsUser: postsUser,
            });
        }))
        .catch(error => console.log(error));
});

module.exports = router;

