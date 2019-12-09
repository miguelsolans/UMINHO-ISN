const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, (req, res) => {
    res.render('settings');
});

module.exports = router;
