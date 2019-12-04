const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    by: String,
    date: Date,
    text: String
});

const chatSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, auto: true },
    name: String,
    participants: [],
    messages: [messageSchema]
});

const User = mongoose.model('chatrooms', chatSchema, 'chatrooms');

module.exports = User;