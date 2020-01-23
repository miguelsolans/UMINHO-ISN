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

router.get('/:id', checkAuth, (req, res) => {
    let id = req.params.id;

    messenger.getMessages(id)
        .then(data => res.jsonp(data))
        .catch(err => res.jsonp(err));
});



router.put('/', checkAuth, (req, res) => {
    let message = req.body;
    let user = req.decodedUser;

    console.log(message);

    let msg = {
        chatId: message.chatId,
        text: message.text,
        date: Date.now(),
        by: user
    };

    messenger.sendMessage(msg)
        .then(result => console.log(result))
        .catch(err => console.log(err));


});


module.exports = router;