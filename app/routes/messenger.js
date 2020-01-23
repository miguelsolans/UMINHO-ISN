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

router.post('/', checkAuth, (req, res) => {
    let user = req.decodedUser;
    let newRoom = req.body;

    let participants = newRoom.participants.split(',');

    participants.push(user);
    console.log(participants);
    newRoom.participants = participants;
    console.log(newRoom);

    messenger.newRoom(newRoom)
        .then(data => console.log(data))
        .catch(err => console.log(err));

    //let participants =
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
        .then(result => res.jsonp(result))
        .catch(err => res.jsonp(err));


});


module.exports = router;