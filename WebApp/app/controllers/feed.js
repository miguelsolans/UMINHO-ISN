const Feed = require('../models/user');

module.exports.getFeed = () => {
    return Feed.aggregate([{
        $unwind: "$posts"
    }, {
        $project: {
            fullName: 1,
            posts: 1
        }
    }]);
    // return Feed.find().select({ fullName: true, posts: true }).exec();
};

module.exports.addToFeed = (username) => {

    let newContent = {
        content: {
            text: "Hello World! Welcome to ISN"
        },
        date: new Date(),
        likes: 0
    };

    return Feed.update({ username: username}, {
        $push: { posts: newContent }
    });
};