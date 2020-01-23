// Loading Modules
const createError = require('http-errors');

const dotenv = require('dotenv').config();

// Express Server
const express = require('express');
const app = express();

// Body Parser
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Morgan For Request Status
// const logger = require('morgan');

// Colors
const colors = require('colors');

// MongoDB
const mongoose = require('mongoose');

// Connection to Database
mongoose
    .connect(`${process.env.MONGO_ATLAS}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log(
            "Connection to MongoDB successfully established.".cyan.bold
        );
    })
    .catch(() => {
        console.log("Couldn't connect to MongoDB".red);
    });

// Display Request Status
// app.use(logger('dev'));

// Tell node where Public Files are located
app.use(express.static('./app/public'));

// Setup EJS View Engine
app.set('view engine', 'ejs');
app.set('views', './app/views');

// To Read it in JSON
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(cookieParser());

// Frontend Routes
const RootRoutes = require('../app/routes/index');
const FeedRoutes = require('../app/routes/feed');
const ProfileRoutes = require('../app/routes/profile');
const SettingsRoutes = require('../app/routes/settings');
const MessengerRoutes = require('../app/routes/messenger');
const GroupRoutes = require('../app/routes/group');
const TestRoutes = require('../app/routes/test');
const UserPostRoutes = require('../app/routes/user-posts');

// Webapp Root Routes
app.use('/', RootRoutes);
app.use('/feed', FeedRoutes);
app.use('/profile', ProfileRoutes);
app.use('/settings', SettingsRoutes);
app.use('/messenger', MessengerRoutes);
app.use('/group', GroupRoutes);
app.use('/test', TestRoutes);
app.use('/userpost', UserPostRoutes);


// API Routes
const FeedAPI = require('../app/routes/api/feed');
app.use('/api/feed', FeedAPI);

const UserPostAPI = require('../app/routes/api/user-posts');
app.use('/api/userpost', UserPostAPI);



// Catch 404 and forward to Error Handler
app.use((req, res, next) => {
    next(createError(404));
});

// Error Handler
app.use((err, req, res, next) => {

    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.render('error');
});

// Module Export
module.exports = app;