const Post = require('../models/userPost');


exports.getPosts = (req, res, next) => {

    res.status(200).json(
        res.advancedResults
    );
};

module.exports.addNew = (data) => {
    let newData = new Post(data);

    return newData.save();
};