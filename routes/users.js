const express = require("express");
const Users = require("../helpers/sequelizeInit").Users;
const Levels = require("../helpers/sequelizeInit").Levels;

const router = express.Router();

router.get("/", (req, res) => {
  Users.findAll({
    raw: true,
    attributes: ['id', 'name', 'surname', 'login', 'email', 'joinedAt',
      'level.level'
    ],
    include: [{
      model: Levels,
      attributes: []
    }]
  }).then(user => {
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