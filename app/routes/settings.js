const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const checkAuth = require('../middleware/check-auth');
/*const multer = require('multer');
const upload = multer({
    dest: 'app/public/uploads'
});*/
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

router.post('/picture-update', checkAuth, (req, res) => {
    let user = req.decodedUser;

    console.log('Profile Picture Update');

    console.log(req.body.file);

    /*
      let user = req.decodedUser;

      console.log('Profile Picture Update');
      console.log(user);
      console.log(req.file)


      if (!req.files) {
          console.log('Não foi dado upload de nenhum ficheiro');
      }

      const file = req.files.file;

      if (!file.mimetype.startsWith('image')) {
          console.log('O ficheiro não é uma imagem');
      }

      if (file.size > process.env.MAX_FILE_SIZE) {
          console.log('Ficheiro demasiado grande');
      }

      file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

      file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
          if (err) {
              console.error(err);
          }

          await User.updateInfo(user, {
              photo: file.name
          });
      });*/
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