const express   = require('express');
const router    = express.Router();
const group     = require('../../controllers/groups');
const checkAuth = require('../../middleware/check-auth');
const groupPost = require('../../controllers/groupPosts');

/*********************************************************************
 * Group Basic Operations
 *********************************************************************/

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

    if(req.params.limit !== undefined) {
        group.listTopGroups({members: req.decodedUser}, req.params.limit )
            .then(data => res.jsonp(data))
            .catch(err => res.jsonp(err));

    } else {
        group.listAvailableGroups({ members: req.decodedUser }, { _id: 1, name: 1, description: 1})
            .then(data => res.jsonp(data))
            .catch(err => res.jsonp(err));
    }
});

/**
 * Join a Group
 */
router.post('/join', checkAuth, (req, res) => {
    let user = req.decodedUser;

    console.log(req.body);
});

/**
 * Add user to a group
 */
router.put(':id/add', checkAuth, (req, res) => {
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

/**
 * New Group
 */
router.post('/new', checkAuth, (req, res) => {

    let newGroup = {
        name: req.body.name,
        description: req.body.description,
        members: [req.decodedUser],
        creator: req.decodedUser,
        audience: req.body.audience === 'true'
    };

    console.log(newGroup);
    group.createGroup(newGroup)
        .then(result => res.jsonp(result))
        .catch(err => res.jsonp(err));

});


/*********************************************************************
 * Post Operations
 *********************************************************************/
/**
 * Create a Group Post
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

/**
 * Get a Group posts
 */
router.get('/:id/posts', (req, res) => {
    groupPost.infoGroupPost(req.params.id)
        .then(result => res.jsonp(result))
        .catch(err => res.jsonp(err));
});

/**
 * Delete a Group Post
 */
router.delete('post/:id', checkAuth, (req, res) => {
    let id = req.params.id;

    console.log(`DELETING POST ${id}`);

    groupPost.deletePost(id)
        .then(result => res.jsonp(result))
        .catch(err => res.jsonp(err));
});

/**
 * Update a Group post
 */
router.put('/post/:id', checkAuth, (req, res) => {
    let id = req.params.id;
    console.log(`UPDATING POST ${id}`);

    let updatedData = {
        content: {
            text: req.body.text
        }
    };

    groupPost.updatePost(id, updatedData)
        .then(result => res.jsonp(result))
        .catch(err => res.jsonp(err));

});

/**
 * Group Comments Routes
 */
/**
 * Get a Group Post Comments
 */
router.get('/post/:id/comments', checkAuth, (req, res) => {
    console.log("Getting Group Posts...");

    let post = req.params.id;

    groupPost.getComments(post)
        .then(result => res.jsonp(result))
        .catch(err => res.jsonp(err));

});

// Post
router.post('/post/:id/comment', checkAuth, (req, res) => {
    let postId = req.params.id;

    let comment = {
        text: req.body.text,
        createdBy: req.decodedUser
    };

    groupPost.addComment(postId, comment)
        .then(result => res.jsonp(result))
        .catch(err => res.jsonp(err));

});

/**
 * Get a Single Group
 */
router.get('/:id', checkAuth, (req, res) => {
    console.log("API GET GROUP");
    group.searchGroupById(req.params.id)
        .then(result => res.jsonp(result))
        .catch(err => res.jsonp(err));
});

module.exports = router;