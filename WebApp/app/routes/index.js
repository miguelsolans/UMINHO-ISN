// Server Routes
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('login');
});


// Export Routes for Index
module.exports = router;