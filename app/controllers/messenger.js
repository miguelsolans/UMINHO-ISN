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
    messages: [ messageSchema ]
});

 */


module.exports.getChatBox = (username) => {

    return Messenger.aggregate([
        { $match: { participants: username }},
        { $unwind: { path: "$messages" }},
        { $sort: { "messages.date": -1 } },
        { $addFields: { by: "$messages.by" }},
        {
            $group: {
                _id: "$_id",
                name: { "$first": "$name"},
                by: {
                    "$first": "$by"
                },
                date: {
                    $first: "$messages.date"
                }
            }
        }
        // { $addField: { by: "$messages.by"}}
    ])
};

module.exports.getMessages = (chatId) => {
    return Messenger.findById(chatId);
};

module.exports.sendMessage = ({chatId, text, date, by}) => {
    return Messenger.findByIdAndUpdate( chatId, {
        $push: {
            messages: {
                by: by,
                text: text,
                date: date
            }
        }
    });

};