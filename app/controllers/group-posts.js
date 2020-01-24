const GroupPost = require('../models/groupPost');
const mongoose = require('mongoose')


// get all groups posts
exports.getAllGroupPosts = () => {
    return GroupPost.find({}).exec();
};

// get post by id
exports.getGroupPostId = (id) => {
    return GroupPost.findOne({
        _id: id
    }).exec();
};

// get group posts
module.exports.userPosts = (groupID) => {
    return GroupPost.find({
        groupId: groupID
    }).sort({
        createdAt: 'desc'
    }).exec()
};

// add new post
module.exports.addNewGroupPost = (data) => {
    let newData = new GroupPost(data);

    return newData.save();
};

// pesquisa de posts pelo texto
module.exports.postsSearch = (word) => {
    return GroupPost.find({
        "content.text": {
            "$regex": word,
            "$options": "i"
        }
    }).sort({
        createdAt: 'desc'
    }).exec();
};

// update post
module.exports.updatePost = (postId, data) => {
    return GroupPost.findByIdAndUpdate(postId, data, {
        new: true,
        runValidators: true
    }).exec();
};

// remover post
module.exports.deletePost = (postId) => {
    return GroupPost.findByIdAndRemove({
        _id: postId
    }).exec();
};

// add comment
module.exports.addComment = (postId, comment) => {
    return GroupPost.findOneAndUpdate({
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
    return GroupPost.update({
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
    return GroupPost.updateOne({
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
    return GroupPost.aggregate([{
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