const express = require('express');
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
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'users'
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + './../views/login.html'));
});

router.post('/', (req, res) => {
    if (req.body === null) return res.status(400).end();
    Users.findAll({
            where: {
                login: req.body.login,
                password: req.body.password
            }
        })
        .then((login) => {
            if (login.length) {
                // res.sendFile(path.join(__dirname + './../views/cabinet.html'));
                res.send('Success');
            } else {
                res.send('Wrong login or password');
            }
        });
});

module.exports = router;