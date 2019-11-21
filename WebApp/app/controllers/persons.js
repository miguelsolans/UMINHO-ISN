const mongoose  = require('mongoose');
const Person    = require('../models/person');

// List Group of People, depending on a Query
module.exports.list = (query) => {
    return Person.find(query).exec();
};

// Add new Person to Database
module.exports.addNew = (data) => {
    let newData = new Person(data);

    return newData.save();
};