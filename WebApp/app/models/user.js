/*
 * User Schema
 * Contributors: Diogo Nogueira, Mateus Silva, Miguel R. Solans
 */

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    /* Not sure about this Data Type. */
    img: {
        data: Buffer,
        contentType: String
    },
    first_name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20
    },
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20
    },
    birth_date: {
        type: Date
    },
    bio: {
        type: String,
        maxlength: 200
    },
    git_link: {
        type: String,
        match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
    },
    email: {
        type: String,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    actual_year: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    },
    city: {
        type: String
    }
});

const User = mongoose.model('user', userSchema, 'user');

module.exports = User;