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
    date: { type: Date, auto: true },
    content: [postContentSchema],
    likes: Number
});
const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, auto: true },
    username: String,
    fullName: String,
    password: String,
    email: String,
    bio: String,
    courses: { type: Array },
    posts: [userPostSchema],
    groups: Array,
    likes: Array,
});

const User = mongoose.model('users', userSchema, 'users');

module.exports = User;