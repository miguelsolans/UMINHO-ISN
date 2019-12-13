const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    console.log("Group Root")
});

router.get('/:id', (req, res) => {
    console.log(`GET / group ${req.params.id}`);
});

module.exports = router;