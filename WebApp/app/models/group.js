const mongoose = require('mongoose');

const postContentSchema = new mongoose.Schema({
    image: String,
    text: String,
    url: String,
});
const postSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, auto: true },
    createdBy: String,
    content: [postContentSchema],
    likes: Number
});
const groupSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, auto: true },
    name: String,
    posts: [postSchema]
});

const Group = mongoose.model('groups', groupSchema, 'groups');

module.exports = Group;