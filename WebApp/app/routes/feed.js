const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const feed = require('../controllers/feed');

router.get('/', checkAuth, (req, res) => {
    feed.getFeed()
        .then(data => res.render('feed', {data: data}))
        .catch(err => console.log(err));
});

// Publicar no feed
router.post('/', (req, res) => {

});

// Gostar de uma publicação
router.put('/:id', (req, res) => {

});

module.exports = router;