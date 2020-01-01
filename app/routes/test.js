const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const feed = require('../controllers/feed');

router.get('/', (req, res) => {
    res.jsonp({msg: "Hello World!"});
});


module.exports = router;