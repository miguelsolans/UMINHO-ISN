const Messenger = require('../models/chatroom');

/*
const messageSchema = new mongoose.Schema({
    by: String,
    date: Date,
    text: String
});

const chatSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, auto: true },
    name: String,
    participants: [ String ],
    messages: [messageSchema]
});

 */


module.exports.getChatBox = (username) => {

    return Messenger.aggregate([
        { $match: { participants: username }},
        { $unwind: { path: "$messages" }},
        { $sort: { "messages.date": -1 } },
        { $limit: 1 },
        { $addFields: { by: "$messages.by" }},
        { $project: { _id: 1, name: 1, by: 1}}
        // { $addField: { by: "$messages.by"}}
    ])
};

module.exports.getMessages = (chatId) => {
    return Messenger.findById(chatId);
};

module.exports.sendMessage = ({chatId, sender, message}) => {
    console.log(`${chatId} ${sender} ${message}`);
};