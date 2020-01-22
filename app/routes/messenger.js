const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const socket = require('socket.io');
const axios = require('axios');

const messenger = require('../controllers/messenger');


router.get('/', checkAuth, (req, res ) => {
    let user = req.decodedUser;
    messenger.getChatBox(user)
        .then(data => {
            console.log(data);
            res.render('messenger', { data })
        })
        .catch(err => console.log(err));
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    messenger.getMessages(id)
        .then(data => res.jsonp(data))
        .catch(err => res.jsonp(err));
});



router.post('/', (req, res) => {
    let message = req.params.body;

    console.log(message);


});


module.exports = router;