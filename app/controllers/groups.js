const mongoose = require('mongoose');
const User = require('../models/user');


module.exports.searchGroup = groupId => {
    return User.findOne({
            _id: groupId
        })
        .exec();
};