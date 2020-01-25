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
  return User.findOneAndUpdate(user, info, {
    new: true,
    runValidators: true
  });
};

module.exports.updateAvatar = ({
                                 username,
                                 avatar
                               }) => {
  return User.findOneAndUpdate({
    username: username
  }, {
    $set: {
      photo: avatar
    }
  });
};


module.exports.updatePassword = (user, password) => {
  return User.findOneAndUpdate({
    username: user
  }, {
    password: password
  });
};

module.exports.getGroups = username => {
  return User.findOne({
    username: username
  })
      .select({
        _id: 0,
        groups: 1
      })
      .exec();
};

module.exports.getInfoFeed = username => {
  return User.findOne({
    username: username
  })
      .select({
        _id: 0,
        username: 1,
        fullName: 1,
        photo: 1
      })
      .exec();
};

module.exports.addGroup = (userId, groupInfo) => {
  return User.findOneAndUpdate({
    _id: userId
  }, {
    $push: {
      groups: groupInfo
    }
  }, {
    new: true,
    runValidators: true
  });
};

module.exports.removeGroup = (userId, groupId) => {
  return User.update({
    _id: userId
  }, {
    $pull: {
      groups: {
        groupId: groupId
      }
    }
  }, {
    safe: true,
    multi: true
  });
};