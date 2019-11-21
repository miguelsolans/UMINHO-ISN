/*
 * Person Schema
 * Contributors: Diogo Nogueira, Mateus Silva, Miguel R. Solans
 */

const mongoose = require('mongoose');

// Person Schema 
const personSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
    name: String,
    age: Number
});

const Person = mongoose.model('people', personSchema,'people');

module.exports = Person;