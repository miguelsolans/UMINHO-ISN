const express = require('express');
const router = express.Router();
const Users = require('../../controllers/users');
const checkAuth = require('../../middleware/check-auth');


router.get('/groups', checkAuth, (req, res) => {
    Users.getGroups(req.decodedUser).then(result => res.jsonp(result)).catch(err => res.jsonp(err))
})


module.exports = router;