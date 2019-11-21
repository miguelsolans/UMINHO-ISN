/* models/person
 * Author: Miguel Solans, Mateus SIlva, Diogo Nogueira
 * Notes: User Model
 */

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    /* ! not sure about this data type */
    img: {
        data: Buffer,
        contentType: String
    },
    first_name: {
        type: String,
        required: [true, 'Please add a first name'],
        trim: true,
        maxlength: [20, 'First name can not be more than 20 characters']
    },
    last_name: {
        type: String,
        required: [true, 'Please add a last name'],
        trim: true,
        maxlength: [20, 'Last name can not be more than 20 characters']
    },
    username: {
        type: String,
        required: [true, 'Please add a username'],
        trim: true,
        maxlength: [20, 'Username can not be more than 20 characters']
    },
    birth_date: {
        type: Date
    },
    bio: {
        type: String,
        maxlength: [200, 'Bio can not be more than 200 characters']
    },
    git_link: {
        type: String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid URL with HTTP or HTTPS'
        ]
    },
    email: {
        type: String,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email'
        ]
    },
    actual_year: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    },
    city: {
        type: String
    }
});

const Person = mongoose.model('user', userSchema, 'user');

module.exports = Person;