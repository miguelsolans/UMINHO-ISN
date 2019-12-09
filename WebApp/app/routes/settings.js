const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const User = require('../controllers/users');

router.get('/', checkAuth, (req, res) => {

    console.log(req.decodedUser);

    User.searchUser(req.decodedUser)
        .then(data => {
            let fieldsToDisplay = {
                _id: data._id,
                fullName: data.fullName,
                bio: data.bio,
                email: data.email
            };
            res.render('settings', { data: data });
            // res.render('settings', { data: {
            //         _id: data._id,
            //         fullName: data.fullName,
            //         bio: data.bio,
            //         email: data.email
            //     }});
        })
        .catch(err => console.log(err));
});

module.exports = router;
