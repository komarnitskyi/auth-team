const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const loginAuthenticate = require("../helpers/authenticate").loginAuthenticate;
const hashSecretWord = require("../helpers/cryptPassword").hashPassword;

const router = express.Router();
const secretWord = "authenticate";

require("../helpers/passport");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "./../views/login.html"));
});

router.post("/", loginAuthenticate, (req, res) => {
  if (req.user === null) return res.status(400).end();
  const token = jwt.sign({
      id: req.user.id,
      iat: Math.floor(Date.now() / 1000) + 600
    },
    hashSecretWord(secretWord)
  );
  req.login(
    req.user, {
      session: true
    },
    err => {
      if (err) {
        res.send(err);
      }
      console.log(`User ${req.user.name} login!`);
      return res.json({
        token
      });
    }
  );
});

module.exports = router;