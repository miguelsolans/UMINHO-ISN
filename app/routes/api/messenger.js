const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-auth');
const messenger = require('../../controllers/messenger');


router.get('/', (req, res) => {
    res.jsonp(messenger.getChatBox("miguelsolans"));
});

module.exports = router;