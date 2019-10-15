const express = require("express");
const Users = require("../helpers/sequelizeInit").Users;
const Levels = require("../helpers/sequelizeInit").Levels;

const router = express.Router();

router.get("/", (req, res) => {
  Users.findAll({
    raw: true,
    attributes: ["id", "name", "surname", "login", "email", "joinedAt", "level.level"],
    include: [{
      model: Levels,
      attributes: []
    }]
  }).then(user => {
    if (user.length) {
      res.send(JSON.stringify(user));
    } else {
      res.status(422).send("No users found!");
    }
  });
});
router.get("/:id", (req, res) => {
  if (req.user !== null) {
    res.send(JSON.stringify(req.user));
  } else {
    res.status(422).send("No users found!");
  }
});

module.exports = router;