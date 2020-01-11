/**
 * User Schema
 * Contributors: Diogo Nogueira, Mateus Silva, Miguel R. Solans
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const widgetSchema = new mongoose.Schema({
    title: String,
    content: String,
    display: Boolean
});

const userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        auto: true
    },
    username: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    bio: {
        type: String
    },
    widgets: {
        type: [widgetSchema]
    },
    courses: {
        type: Array
    },
    groups: {
        type: [String]
    },
    likes: {
        type: [String]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    photo: {
        type: String,
        default: 'default.jpg'
    }
});

// coloquei aqui pq antes a password ficava logo hashed e nao passava pelo teste da password ter no minimo de 8 caratetes
// Encrypt password using bccrypt
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model('users', userSchema, 'users');

module.exports = User;