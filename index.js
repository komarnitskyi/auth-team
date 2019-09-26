const express = require('express');
const path = require('path');

const port = 6969;
const app = express();

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

app.listen(port);
