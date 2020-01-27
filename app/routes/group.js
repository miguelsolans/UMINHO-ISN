const express = require('express');
const router = express.Router();
const group = require('../controllers/groups');
const checkAuth = require('../middleware/check-auth');
const groupPost = require('../controllers/groupPosts');

router.get('/', checkAuth, (req, res) => {

});

/**
 * List public routes
 */
router.get('/public', checkAuth, (req, res) => {
    
    group.listAvailableGroups({audience: true}, {_id: 1, name: 1, description: 1})
        .then(result => res.jsonp(result))
        .catch(err => res.jsonp(err));
});

/**
 * List groups owned by me
 */
router.get('/own', checkAuth, (req, res) => {
    group.listAvailableGroups({ creator: req.decodedUser })
        .then(result => res.jsonp(result))
        .catch(err => res.jsonp(err));
});

/**
 * Groups I take part of
 */
router.get('/registered', checkAuth, (req, res) => {
    group.listAvailableGroups({ members: req.decodedUser }, { _id: 1, name: 1, description: 1})
        .then(data => res.jsonp(data))
        .catch(err => res.jsonp(err));
});

router.get('/:id', (req, res) => {
    group.searchGroupById(req.params.id)
        .then(result => res.jsonp(result))
        .catch(err => res.jsonp(err));
});

router.put('/join/:id', checkAuth, (req, res) => {
    let user = [req.decodedUser];
    group.registerMembers(req.params.id, user)
        .then(result => res.jsonp(result))
        .catch(err => res.jsonp(err));
});

router.put('/add/:id', checkAuth, (req, res) => {
    let users = req.body.users;

    group.creator(req.params.id)
        .then(data => {
            if(data.creator === req.decodedUser && !data.audience) {
                group.registerMembers(req.params.id, users)
                    .then(result => res.jsonp(result))
                    .catch(err => res.jsonp(err));

            } else if (result.audience) {
                group.registerMembers(req.params.id, users)
                    .then(result => res.jsonp(result))
                    .catch(err => res.jsonp(err));
            } else {
                res.jsonp({title: "No Permission", message: "You don't have enough permissions to add users"});
            }
        })
        .catch(err => res.jsonp(err));
});

router.post('/new', checkAuth, (req, res) => {

    let newGroup = {
        name: req.body.name,
        description: req.body.description,
        creator: req.decodedUser,
        audience: req.body.audience === 'true'
    };

    console.log(newGroup);
    group.createGroup(newGroup)
        .then(result => res.jsonp(result))
        .catch(err => res.jsonp(err));

});


/**
 * New Posts
 */
router.post('/:id/post', checkAuth, (req, res) => {
    let user = req.decodedUser;

    let newPost = {
        groupId: req.params.id,
        createdBy: user,
        content: {
            text: req.body.text
        }
    };

    groupPost.addNewGroupPost(newPost)
        .then(result => res.jsonp(result))
        .catch(err => res.jsonp(err));

});

router.get('/:id/posts', (req, res) => {

    groupPost.getGroupPostId(req.params.id)
        .then(result => res.jsonp(result))
        .catch(err => res.jsonp(err));
});

module.exports = router;