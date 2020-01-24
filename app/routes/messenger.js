const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const dotenv = require('dotenv');
const axios = require('axios');

// const socket = require('socket.io')();

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


module.exports = router;