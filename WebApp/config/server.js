// Loading modules
const createError = require('http-errors');
// Express server
const express = require('express');
const app = express();
// Body Parser
const bodyParser = require('body-parser');
// Colors
const colors = require('colors');
// Morgan For Request Status
const logger = require('morgan');
// MongoDB
const mongoose = require('mongoose');

// Connection to database
mongoose
    .connect('mongodb://127.0.0.1:27017/HelloWorldDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log(
            'Connection to MongoDB successfully established'.cyan.underline.bold
        );
    })
    .catch(() => {
        console.log("Couldn't connect to MongoDB".red);
    });

// Display Request Status
app.use(logger('dev'));

// Tell node where public files are located
app.use(express.static('./app/public'));

// Setup EJS View Engine
app.set('view engine', 'ejs');
app.set('views', './app/views');

// urlencoded tells body-parser to extract data from <from>
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

// To read it in JSON
app.use(bodyParser.json());

// Define Routes
const RootRoutes = require('../app/routes/index');

// Webapp Root Routes
app.use('/', RootRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});
// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// Module Export
module.exports = app;