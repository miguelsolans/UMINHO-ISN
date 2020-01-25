const express = require('express');
const router = express.Router();
const Groups = require('../../controllers/groups');
const checkAuth = require('../../middleware/check-auth');

router.get('/', (req, res) => {
    Groups.listAvailableGroups()
        .then( result => res.jsonp(result))
        .catch( err => res.jsonp(err));
});

router.get('/members/:id', (req, res) => {
    Groups.groupMembers(req.params.id)
        .then(result => res.jsonp(result))
        .catch(err => res.jsonp(err));
});

router.get('/:id', (req, res) => {
    Groups.searchGroup(req.params.id)
        .then(result => res.jsonp(result))
        .catch(err => res.jsonp(err))
});

router.post('/', (req, res) => {
    console.log(req.body);
    let group = {
        name: req.body.name,
        sigla: req.body.sigla
    };

    Groups.createGroup(group)
        .then(result => res.jsonp(result))
        .catch(err => res.jsonp(err));
});

router.put('/:id', (req, res) => {
    let group = {
        groupId: req.params.id,
        members: req.body.members
    };

    Groups.registerMembers(group)
        .then(result => res.jsonp(result))
        .catch(err => res.jsonp(err));

});


router.delete('/:id', (req, res) => {
    console.log(`DELETE ${req.params.id}`);

    Groups.deleteGroup(req.params.id)
        .then(result => res.jsonp(result))
        .catch(err => res.jsonp(err));
});


module.exports = router;