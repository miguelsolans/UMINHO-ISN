const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv').config();
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const feed = require('../controllers/feed');

/*
router.get('/', checkAuth, (req, res) => {
    axios.get(`${process.env.APP_URL}/api/userpost/feed`)
        .then(posts => {
                axios.get(`${process.env.APP_URL}/api/user/infofeed`).then(infoFeed => {
                    axios.get(`${process.env.APP_URL}/api/user/groups`).then(groups => {
                        //console.log(posts.data);
                        //console.log(infoFeed.data);
                        //console.log(groups.data);
                    }).catch(error => res.render('error', {
                        data: error.data
                    }))
                }).catch(error => res.render('error', {
                    data: error.data
                }))
            }

            res.render('feed', {
                data: posts.data
            })
        )
        .catch(error => res.render('error', {
            data: error.data
        }))
});
*/

router.get('/', checkAuth, function (req, res, next) {
    let one = `${process.env.APP_URL}/api/userpost/feed`;
    let two = `${process.env.APP_URL}/api/user/infofeed`;
    let three = `${process.env.APP_URL}/api/user/groups`;

    //console.log(req.headers);

    const requestOne = axios.get(one, {
        withCredentials: true
    });
    const requestTwo = axios.get(two, {
        withCredentials: true
    });
    const requestThree = axios.get(three, {
        withCredentials: true
    });

    axios
        .all([requestOne, requestTwo, requestThree])
        .then(
            axios.spread((...responses) => {
                const posts = responses[0].data;
                const infoFeed = responses[1].data;
                const groups = responses[2].data;

                //console.log(infoFeed);
                //console.log(groups);

                res.render('feed', {
                    data: posts,
                    infoFeed: infoFeed,
                    groups: groups,
                });
            })
        )
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