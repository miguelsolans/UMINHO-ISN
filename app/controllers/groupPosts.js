const mongoose = require('mongoose');
const GroupPosts = require('../models/groupPost');

// get post by id
exports.getGroupPostId = (id) => {
    return GroupPosts.find({ groupId: id})
        .sort({
            createdAt: 'desc'
        });
};

// add new post
module.exports.addNewGroupPost = (post) => {
    let newData = new GroupPosts(post);

    return newData.save();
};

// pesquisa de posts pelo texto
module.exports.postsSearch = (word) => {
    return GroupPosts.find({
        "content.text": {
            "$regex": word,
            "$options": "i"
        }
    }).sort({
        createdAt: 'desc'
    })
};

// update post
module.exports.updatePost = (postId, data) => {
    return GroupPosts.findByIdAndUpdate(postId, data, {
        new: true,
        runValidators: true
    })
};

// remover post
module.exports.deletePost = (postId) => {
    return GroupPosts.findByIdAndRemove({
        _id: postId
    })
};

// add comment
module.exports.addComment = (postId, comment) => {
    return GroupPosts.findByIdAndUpdate( postId, {
        $push: {
            comments: comment
        }
    }, {
        new: true,
        runValidators: true
    });
};

// add comment
module.exports.addComment = (postId, comment) => {
    return UserPost.findByIdAndUpdate(postId, {
        $push: {
            comments: comment
        }
    }, {
        new: true,
        runValidators: true
    });
};

// remove comment 
module.exports.removeComment = (postId, commentId) => {
    return GroupPosts.findByIdAndUpdate( postId, {
        "$pull": {
            "comments": {
                _id: commentId
            }
        }
    }, {
        safe: true,
        multi: true
    })
};

// update comment 
module.exports.updateComment = (postId, commentId, text) => {
    return GroupPosts.findByIdAndUpdate(commentId, {
        $set: {
            "comments.$.text": text,
        }
    }, {
        new: true,
    })
};

// find by comment id
module.exports.postByCommentId = (commentId) => {

    let id = mongoose.Types.ObjectId(commentId);
    return GroupPosts.aggregate([{
            $unwind: "$comments"
        }, {
            $match: {
                "comments._id": id
            }
        }, {
            $project: {
                _id: 0,
                comments: 1
            }
        }])
};