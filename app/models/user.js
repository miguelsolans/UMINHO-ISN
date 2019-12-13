/**
 * User Schema
 * Contributors: Diogo Nogueira, Mateus Silva, Miguel R. Solans
 */

const mongoose = require('mongoose');

const postContentSchema = new mongoose.Schema({
    image: String,
    text: String,
    url: String,
});
const userPostSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, auto: true },
    date: Date,
    content: postContentSchema,
    likes: Number
});

const widgetSchema = new mongoose.Schema({
    title: String,
    content: String,
    display: Boolean
});

const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, auto: true },
    username: String,
    fullName: String,
    password: String,
    email: String,
    bio: String,
    widgets: [widgetSchema],
    courses: { type: Array },
    posts: [userPostSchema],
    groups: [String],
    likes: [String],
});

const User = mongoose.model('users', userSchema, 'users');

module.exports = User;