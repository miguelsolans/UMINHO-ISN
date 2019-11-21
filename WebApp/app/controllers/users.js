const mongoose = require('mongoose');
const User = require('../models/user');

module.exports.list = (query) => {
    return User.find(query).exec();
};

module.exports.addNew = (data) => {
    let newData = new User(data);

    return newData.save();
};