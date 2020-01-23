const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const checkAuth = require('../middleware/check-auth');

const multer = require('multer');
const upload = multer({
    dest: 'app/public/uploads'
});


const path = require('path');

const User = require('../controllers/users');

router.get('/', checkAuth, (req, res) => {
    console.log(req.decodedUser);

    User.searchUser(req.decodedUser)
        .then(data =>
            res.render('settings', {
                data: data
            })
        )
        .catch(err => console.log(err));
});

router.post('/picture-update', checkAuth, upload.single("file"), (req, res) => {
    let user = req.decodedUser;

    console.log('Profile Picture Update');

    console.log(req.file);

    console.log(user);

    let oldPath = __dirname + '/../' + req.file.path;
    let newPath = __dirname + '/../public/ficheiros/' + req.file.originalname;

    console.log(`${oldPath}\n${newPath}`);
    //fs.rename(oldPath, newPath, function (err) {
        //if (err) throw err;
    //})


});

// Mudar para PUT
router.post('/update', checkAuth, (req, res) => {
    let user = req.decodedUser;
    console.log('New Data');
    console.log(req.body);

    User.updateInfo(user, req.body)
        .then(result => console.log(result))
        .catch(err => console.log(err));

    res.redirect('/settings');
});

router.put('/change-password', checkAuth, (req, res) => {
    console.log(req.decodedUser);

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) console.log(err);
        else {
            console.log(hash);
            User.updatePassword(req.decodedUser, hash)
                .then(result => console.log(result))
                .catch(err => console.log(err));
        }
    });

    res.redirect('/settings');
});

module.exports = router;