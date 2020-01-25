const User = require('../models/user');
const Group = require('../models/group');

module.exports.createGroup = ({name, sigla}) => {
    let group = new Group({
        name: name,
        sigla: sigla
    });

    return group.save(group);
};

module.exports.listAvailableGroups = () => {
    return Group.find({}, { members: 0 })
};

module.exports.groupMembers = (id) => {

    return Group.findById(id, { _id: 0, members: 1 });
};

module.exports.registerMembers = ({groupId, members}) => {
    return Group.findByIdAndUpdate( groupId, {
        $push: {
            members: members
        }
    });
};

module.exports.searchGroup = groupId => {
    return User.findOne({
            _id: groupId
        })
        .exec();
};

module.exports.deleteGroup = groupId => {

    return Group.findOneAndRemove(groupId);

};
