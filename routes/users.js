const express = require("express");
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
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
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
  },
  levelId: {
    type: Sequelize.INTEGER,
    references: {
      model: "levels",
      key: "level"
    }
  },
}, {
  sequelize,
  modelName: "users"
});

class Levels extends Model {}
Levels.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  level: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: "levels"
});

Levels.hasMany(Users);

router.get("/", (req, res) => {
  Users.findAll().then(user => {
    if (user.length) {
      res.send(JSON.stringify(user));
    } else {
      res.status(422).send("None users are finded.");
    }
  });
});
router.get("/:id", (req, res) => {
  Users.findByPk(req.params.id).then(user => {
    if (user !== null) {
      res.send(JSON.stringify(user));
    } else {
      res.status(422).send("None users are finded.");
    }
  });
});

module.exports = router;