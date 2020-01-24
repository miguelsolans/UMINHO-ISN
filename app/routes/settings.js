const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const checkAuth = require('../middleware/check-auth');
const fs = require('fs');
const path = require('path');


const multer = require('multer');
const upload = multer({
    dest: 'app/public/uploads'
});


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

    // let uploadedFile = path.join(__dirname, `../public/uploads/${req.file.path}`);
    let uploadedFile = req.file.path;

    let userPorfilePath = path.join(__dirname, `../public/uploads/${user}/${req.file.originalname}`);

    fs.rename(uploadedFile, userPorfilePath, err => {
        if(err)
            throw err;
    });



    console.log(userPorfilePath);
    // fs.write()

    // let oldPath = __dirname


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