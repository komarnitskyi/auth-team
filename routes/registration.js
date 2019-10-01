const express = require("express");
const app = express();
const path = require("path");
const Sequelize = require("sequelize");
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
    allowNull: false,
    validate: {
      is: /^[a-zA-Z0-9]{1,}$/,
    }
  },
  surname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z0-9]{1,}$/,
    }
  },
  login: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^([a-zA-z])(?!\S*?[\(\)\{\}\/\\\[\],. а-яА-Я]).{5,}$/,
    }

  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?!\S*?[\(\)\{\}\/\\\[\],. а-яА-Я]).{6,})\S$/
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
}, {
  sequelize,
  modelName: "users"
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "./../views/registration.html"));
});

router.post("/", (req, res) => {
  if (req.body === null) return res.status(400).end();
  Users.findAll({
    where: {
      login: req.body.login
    }
  }).then(login => {
    if (!login.length) {
      Users.create({
          name: req.body.name,
          surname: req.body.surname,
          login: req.body.login,
          password: req.body.password,
          email: req.body.email
        })
        .then(() => {
          res.status(200).send("Registration success");
        })
        .catch(Sequelize.ValidationError, err => {
          console.log('Validation Error');

          res.status(400).send("Validation error");
        });
    } else {
      res.send("This login is already use.");
    }
  });
});

module.exports = router;