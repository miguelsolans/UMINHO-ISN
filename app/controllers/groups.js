const User = require('../models/user');
const Group = require('../models/group');

module.exports.createGroup = (newGroup) => {
    let group = new Group(newGroup);

    return group.save(group);
};

module.exports.listAvailableGroups = (query, projection) => {
    return Group.find(query, projection)
};

module.exports.listTopGroups = (member, limit) => {
    return Group.find(member).limit(limit);

};
module.exports.groupMembers = (id) => {

    return Group.findById(id, { _id: 0, members: 1 });
};

module.exports.registerMembers = (groupId, members) => {
    return Group.findByIdAndUpdate( groupId, {
        $push: {
            members: members
        }
    });
};

module.exports.searchGroupById = groupId => {
    return Group.findById(groupId);
};

module.exports.deleteGroup = groupId => {

    return Group.findOneAndRemove(groupId);

};


module.exports.creator = (groupId) => {
    return Group.findById(groupId, { creator: 1});
};