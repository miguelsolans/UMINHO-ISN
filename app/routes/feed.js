const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv').config();
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const feed = require('../controllers/feed');


router.get('/', checkAuth, (req, res) => {

    console.log(`${process.env.APP_URL}`);
    axios.get(`${process.env.APP_URL}/api/feed`)
        .then(result => res.render('feed', { data: result.data }))
        .catch(error => res.render('error', {data: error.data }));
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