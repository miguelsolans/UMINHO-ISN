const mongoose = require('mongoose');
const User = require('../models/user');

// List Group of Users, depending on a Query
module.exports.list = (query) => {
    return User.find(query).exec();
};

module.exports.searchUser = (user) => {
    return User.findOne({username: user}).exec();
};

// Add new User to Database
module.exports.addNew = (data) => {
    let newData = new User(data);

    return newData.save();
};

module.exports.updateInfo = (user, info) => {
    return User.findOneAndUpdate({username: user}, info);
};

module.exports.updatePassword = (user, password) => {
    return User.findOneAndUpdate({username: user}, {password: password});
};