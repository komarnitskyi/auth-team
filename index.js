const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const login = require('./routes/login');
const registration = require('./routes/registration');

const urlencodedParser = bodyParser.urlencoded({
    extended: false,
});

const port = 6969;

app.use(bodyParser.json());
app.use(urlencodedParser);
app.use('/static', express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')));
app.get('/success', (req, res) => res.sendFile(path.join(__dirname + '/views/success.html')));

app.use('/login', login);
app.use('/registration', registration);

app.listen(port, () => console.log(`Listening port ${port}`));