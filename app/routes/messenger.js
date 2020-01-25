const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const dotenv = require('dotenv');
const axios = require('axios');

router.get('/', checkAuth, (req, res ) => {
    axios.get(`${process.env.API_URL}/messenger`, {
        headers:  {
            Cookie: `userToken=${req.cookies.userToken}`
        }
    })
        .then(response => res.render('messenger', { data: response.data}))
        .catch(err => console.log(err));
});

router.get('/:id', checkAuth, (req, res) => {
    let id = req.params.id;

    axios.get(`${process.env}/messenger/${id}`, {
        headers: {
            Cookie: `userToken=${req.cookies.userToken}`
        }})
        .then(response => res.render('messenger'))
        .catch(err => res.render('messenger'));
});


// io.on('connect', socket => {
//     console.log("user connected");
// });

/*io.configure(function() {
    io.set('transports', ['websocket']);
});

io.configure('production', function() {
    io.set('log level', 1);
});

io.sockets.on('connection', socket => {

    socket.on('join', (channel, ack) => {
        socket.get('channel', (err, oldChannel) => {
            if(oldChannel)
                socket.leave(oldChannel);

            socket.set('channel', channel, () => {
                ack();
            })
        })
    });

    socket.on('message', (msg, ack) => {
        socket.get('channel', (err, channel) => {
            if (err) {
                socket.emit('error', err);
            } else if (channel) {
                socket.broadcast.to(channel).emit('broadcast', msg);
                ack();
            } else {
                socket.emit('error', 'no channel');
            }
        });
    });
});*/


module.exports = router;