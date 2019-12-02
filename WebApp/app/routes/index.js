// Server Routes
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('login');
});

router.get('/feed', (req, res) => {
    res.render('feed');
});

router.get('/messenger', (req, res) => {
    res.render('messenger');
});
// Export Routes for Index
module.exports = router;