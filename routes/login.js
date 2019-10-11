const express = require("express");
const path = require("path");
const Sequelize = require("sequelize");
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const router = express.Router();

const sequelize = new Sequelize("JquNDev7GA", "JquNDev7GA", "vYpSRLmr34", {
  host: "remotemysql.com",
  dialect: "mysql",
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
    allowNull: false,
    validate: {
      is: /^([a-zA-z])(?!\S*?[\(\)\{\}\/\\\[\],. а-яА-Я]).{5,}$/
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?!\S*?[\(\)\{\}\/\\\[\],. а-яА-Я]).{6,})\S$/
    }
  }
}, {
  sequelize,
  modelName: "users"
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "./../views/login.html"));
});

router.post("/", (req, res) => {
  if (req.body === null) return res.status(400).end();
  const password = req.body.password;
  Users.findAll({
    where: {
      login: req.body.login,
    }
  }).then(user => {
    if (user.length) {
      bcrypt.compare(password, user[0].dataValues.password).then((isMatch) => {
        if (isMatch) {
          const header = {
            algorithm: "RS256"
          }
          const privateKey = fs.readFileSync('./private.pem');
          const token = jwt.sign({
            id: user[0].dataValues.id,
            iat: Math.floor(Date.now() / 1000) + 30
          }, privateKey, header)
          res.send(JSON.stringify(token));
        } else {
          res.status(422).send("Wrong login or password");
        }
      })
    } else {
      res.status(422).send("Wrong login or password");
    }
  });
});

module.exports = router;