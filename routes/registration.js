const express = require('express');
const app = express();
const path = require('path');
const Sequelize = require('sequelize');
const router = express.Router();
const sequelize = new Sequelize('JquNDev7GA', 'JquNDev7GA', 'vYpSRLmr34', {
    host: 'remotemysql.com',
    dialect: 'mysql',
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

const Model = Sequelize.Model;
class Users extends Model {}
Users.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [8, 255],
        }
    },
}, {
    sequelize,
    modelName: 'users'
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + './../views/registration.html'));
});

router.post('/', (req, res) => {
    if (req.body === null) return res.status(400).end();
    Users.findAll({
            where: {
                login: req.body.login
            }
        })
        .then((login) => {
            if (!login.length) {
                Users.create({
                    name: req.body.name,
                    surname: req.body.surname,
                    login: req.body.login,
                    password: req.body.password
                }).then(() => {
                    res.status(200).send("Registration success");
                }).catch(Sequelize.ValidationError, (err) => {
                    res.status(400).send('Validation error');
                });
            } else {
                res.send('This login is already use.');
            }
        });
});

module.exports = router;