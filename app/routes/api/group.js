const express = require('express');
const router = express.Router();
const Groups = require('../../controllers/group');
const checkAuth = require('../../middleware/check-auth');


// colocar aqui middleware pra ver se user pertence ao grupo
router.get('/:id', checkAuth, (req, res) => {
    Groups.searchGroup(req.params.id).then(result => res.jsonp(result)).catch(err => res.jsonp(err))
})