// Server Routes
const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    res.render('login');
});

// Controllers
// const Users = require('../controllers/users');
//
// router.get('/', (req, res) => {
//     Users.list()
//         .then(data => res.jsonp(data))
//         .catch(err => res.status(500).jsonp(err));
// });
//
// router.post('/', (req, res) => {
//     Users.addNew(req.body)
//         .then(data => res.json(data))
//         .catch(err => res.status(500).jsonp(err));
// });

// Export Routes for Index
module.exports = router;