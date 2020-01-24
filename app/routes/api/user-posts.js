const express = require('express');
const router = express.Router();
const UserPost = require('../../models/userPost')
const UserPosts = require('../../controllers/user-posts');
const checkAuth = require('../../middleware/check-auth');
const checkPostOwner = require('../../middleware/check-post-owner');
const checkCommentOwner = require('../../middleware/check-comment-owner');
const checkCommentDelete = require('../../middleware/check-comment-delete');
const pagination = require('../../middleware/pagination');


router.post('/', checkAuth, (req, res) => {
    console.log(`From Middleware: ${req.decodedUser}`);
    // criar objeto json do post, incluindo user

    const newPost = {
        createdBy: req.decodedUser,
        content: req.body.content
    };

    UserPosts.addNew(newPost)
        .then(result => console.log(result))
        .catch(err => console.log(err))

    //reencaminhar...
});

router.delete('/:id', checkAuth, checkPostOwner, (req, res) => {

    UserPosts.deletePost(req.params.id)
        .then(result => console.log(result))
        .catch(err => console.log(err))

});

router.put('/:id', checkAuth, checkPostOwner, (req, res) => {

    UserPosts.updatePost(req.params.id, req.body)
        .then(result => res.jsonp(result))
        .catch(err => res.jsonp(err))
});

router.get('/search', checkAuth, (req, res) => {
    UserPosts.postsSearch(req.body.pesquisa)
        .then(result => res.jsonp(result))
        .catch(err => res.jsonp(err))
});


router.get('/feed', checkAuth, pagination(UserPost), (req, res) => {
    UserPosts.postsDate()
        .then(result => res.jsonp(result))
        .catch(err => res.jsonp(err)) // pra usar pafinação, fazer res.AdvencedResults
});

// logged in user posts 
router.get('/feed/me', checkAuth, pagination(UserPost), (req, res) => {
    console.log(req.decodedUser);
    UserPosts.userPosts(req.decodedUser)
        .then(result => res.jsonp(result))
        .catch(err => res.jsonp(err))
});

//user posts
router.get('/feed/:username', checkAuth, (req, res) => {
    UserPosts.userPosts(req.params.username)
        .then(result => res.jsonp(result))
        .catch(err => res.jsonp(err))
})


// add comentário
router.post('/comment/:postId', checkAuth, (req, res) => {
    const newComment = {
        createdBy: req.decodedUser,
        text: req.body.text
    }
    UserPosts.addComment(req.params.postId, newComment).then(result => res.jsonp(result)).catch(err => res.jsonp(err))
})

// remove comentário
router.delete('/comment/:postId', checkAuth, checkCommentDelete, (req, res) => {

    UserPosts.removeComment(req.params.postId, req.body.idComment).then(result => res.jsonp(result)).catch(err => res.jsonp(err))
})

// update comentário
router.put('/comment/:postId', checkAuth, checkCommentOwner, (req, res) => {

    UserPosts.updateComment(req.params.postId, req.body.idComment, req.body.text).then(result => res.jsonp(result)).catch(err => res.jsonp(err))
})



module.exports = router;