const express = require("express");
const Users = require("../helpers/sequelizeInit").Users;

const router = express.Router();

router.get("/", (req, res) => {
  Users.findAll().then(user => {
    if (user.length) {
      res.send(JSON.stringify(user));
    } else {
      res.status(422).send("None users are found.");
    }
  });
});
router.get("/:id", (req, res) => {
  Users.findByPk(req.params.id).then(user => {
    if (user !== null) {
      res.send(JSON.stringify(user));
    } else {
      res.status(422).send("None users are found.");
    }
  });
});

module.exports = router;