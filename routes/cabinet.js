const express = require("express");
const path = require("path");
const Sequelize = require("sequelize");
const jwt = require('jsonwebtoken');
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
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  surname: {
    type: Sequelize.STRING,
    allowNull: true
  },
  login: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^([a-zA-z])(?!\S*?[\(\)\{\}\/\\\[\],. а-яА-Я]).{5,}$/
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: "users"
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "./../views/cabinet.html"));
});

router.post("/", (req, res) => {
  const token = req.headers['auth-token'];
  // console.log(req.headers['auth-token']);

  jwt.verify(token, 'secret', function (err, decoded) {
    if (err || !decoded.id) return res.status(422).send("Wrong login or password");
    Users.findAll({
      where: {
        id: decoded.id
      }
    }).then(user => {
      if (user.length) {
        res.send(JSON.stringify(user[0]));
      } else {
        res.status(422).send("Wrong login or password");
      }
    });
  });
  //if (req.body === null) return res.status(400).end();
});

module.exports = router;