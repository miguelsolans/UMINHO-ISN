const express = require('express');
const router = express.Router();


router.get('/', (req, res ) => {
    console.log("Messenger");
    res.render('messenger');
});


module.exports = router;