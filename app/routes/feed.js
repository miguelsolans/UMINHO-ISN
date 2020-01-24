const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv').config();
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const feed = require('../controllers/feed');


router.get('/', checkAuth, function (req, res, next) {
    let one = `${process.env.APP_URL}/api/userpost/feed`;
    let two = `${process.env.APP_URL}/api/user/infofeed`;
    let three = `${process.env.APP_URL}/api/user/groups`;

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
    const requestThree = axios.get(three, {
        headers: {
            Cookie: `userToken=${req.cookies.userToken}`
        }
    });

    axios.all([requestOne, requestTwo, requestThree])
        .then(axios.spread((...responses) => {
            const posts = responses[0].data;
            console.log(posts);
            const infoFeed = responses[1].data;
            const groups = responses[2].data;
            const firstName = responses[1].data.fullName.split(" ")[0];

            res.render('feed', {
                data: posts,
                infoFeed: infoFeed,
                groups: groups,
                firstName: firstName 
            });
        }))
        .catch(error => res.render('error', {
            data: error.data
        }))
});






// Publicar no feed
router.post('/', checkAuth, (req, res) => {
    feed.addToFeed(req.decodedUser)
        .then(result => console.log(result))
        .catch(err => console.log(err));
    res.redirect('/feed');
});

// Gostar de uma publicação
router.put('/:id', (req, res) => {

});

module.exports = router;