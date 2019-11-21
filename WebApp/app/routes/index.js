// Server Routes
const express = require('express');
const router = express.Router();

// Controllers
const Persons = require('../controllers/persons');

router.get('/', (req, res) => {
    Persons.list()
        .then(data => res.jsonp(data))
        .catch(err => res.status(500).jsonp(err));
});

router.post('/', (req, res) => {
    Persons.addNew(req.body)
        .then(data => res.json(data))
        .catch(err => res.status(500).jsonp(err));
});

// Export Routes for Index
module.exports = router;