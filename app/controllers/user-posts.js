const UserPost = require('../models/userPost');
const mongoose = require('mongoose')

// get all users posts
exports.getAllPosts = () => {
    return UserPost.find({}).exec();
};

// get post by id
exports.getPostId = (id) => {
    return UserPost.findOne({
        _id: id
    }).exec();
};

// add new post
module.exports.addNew = (data) => {
    let newData = new UserPost(data);

    return newData.save();
};

// get user posts
module.exports.userPosts = (username) => {
    return UserPost.find({
        createdBy: username
    }).sort({
        createdAt: 'desc'
    }).exec()
};

// get all posts ordered by created date
module.exports.postsDate = () => {
    return UserPost.find({}).sort({
        createdAt: 'desc'
    }).exec();
};

// pesquisa de posts pelo texto
module.exports.postsSearch = (word) => {
    return UserPost.find({
        "content.text": {
            "$regex": word,
            "$options": "i"
        }
    }).sort({
        createdAt: 'desc'
    }).exec();
};

// delete post --> na route verificar primeiro se existe
module.exports.deletePost = (postId) => {
    return UserPost.findByIdAndRemove({
        _id: postId
    }).exec();
};

// update post
module.exports.updatePost = (postId, data) => {
    return UserPost.findByIdAndUpdate(postId, data, {
        new: true,
        runValidators: true
    }).exec();
};

// add comment
module.exports.addComment = (postId, comment) => {
    return UserPost.findOneAndUpdate({
        _id: postId
    }, {
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
    return UserPost.update({
        _id: postId
    }, {
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
    return UserPost.updateOne({
        "_id": postId,
        "comments._id": commentId
    }, {
        $set: {
            "comments.$.text": text,
        }
    }, {
        new: true,
    }).exec()
};

// find by comment id
module.exports.postByCommentId = (commentId) => {

    var id = mongoose.Types.ObjectId(commentId);
    return UserPost.aggregate([{
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
        .exec();
}