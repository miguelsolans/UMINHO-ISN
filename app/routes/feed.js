const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const feed = require('../controllers/feed');

router.get('/', checkAuth, (req, res) => {
    console.log(`From Middleware: ${req.decodedUser}`);
    feed.getFeed()
        .then(data => res.render('feed', {data: data}))
        .catch(err => console.log(err));
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