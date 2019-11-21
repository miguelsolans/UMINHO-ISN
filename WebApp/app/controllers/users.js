const mongoose = require('mongoose');
const User = require('../models/user');

// List Group of Users, depending on a Query
module.exports.list = (query) => {
    return User.find(query).exec();
};

// Add new User to Database
module.exports.addNew = (data) => {
    let newData = new User(data);

    return newData.save();
};