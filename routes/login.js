const express = require("express");
const path = require("path");
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const fs = require("fs");

const privateKey = fs.readFileSync("./private.pem");

require("../helpers/passport");

const authenticate = passport.authenticate("local", {
  session: true
});

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "./../views/login.html"));
});

router.post("/", authenticate, (req, res) => {
  if (req.user === null) return res.status(400).end();
  const header = {
    algorithm: "RS256"
  };
  const token = jwt.sign(
    {
      id: req.user.id,
      iat: Math.floor(Date.now() / 1000) + 30
    },
    privateKey,
    header
  );
  req.login(req.user, { session: true }, err => {
    if (err) {
      res.send(err);
    }
    return res.json({ token });
  });
});

module.exports = router;
