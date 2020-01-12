const mongoose = require('mongoose');
const User = require('../models/user');

// List Group of Users, depending on a Query
module.exports.list = query => {
  return User.find(query).exec();
};

module.exports.searchUser = user => {
  return User.findOne({
    username: user
  })
    .select('+password')
    .exec();
};

module.exports.searchUserEmail = email => {
  return User.findOne({
    email: email
  }).exec();
};

module.exports.searchUserQuery = query => {
  return User.findOne(query).exec();
};

// Add new User to Database
module.exports.addNew = data => {
  let newData = new User(data);

  return newData.save();
};

module.exports.updateInfo = (user, info) => {
  return User.findOneAndUpdate(
    {
      username: user
    },
    info
  );
};

module.exports.updatePassword = (user, password) => {
  return User.findOneAndUpdate(
    {
      username: user
    },
    {
      password: password
    }
  );
};
