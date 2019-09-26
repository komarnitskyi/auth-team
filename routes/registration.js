const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + './../views/registration.html'));
});

router.post('/', (req, res) => {
    res.send(req.body);
});

module.exports = router;
