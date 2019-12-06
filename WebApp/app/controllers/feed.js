const Feed = require('../models/user');

module.exports.getFeed = () => {
    return Feed.find().select({ fullName: true, posts: true }).exec();
};