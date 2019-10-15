const express = require("express");
const path = require("path");
const Sequelize = require("sequelize");
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const passport = require("passport");
const router = express.Router();


const privateKey = fs.readFileSync("./private.pem");

require("../helpers/passport");

const authenticate = passport.authenticate("local", {
  session: true
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "./../views/login.html"));
});

// router.post("/", (req, res) => {
//   if (req.body === null) return res.status(400).end();
//   const password = req.body.password;
//   Users.findAll({
//     where: {
//       login: req.body.login,
//     }
//   }).then(user => {
//     if (user.length) {
//       bcrypt.compare(password, user[0].dataValues.password).then((isMatch) => {
//         if (isMatch) {
//           const header = {
//             algorithm: "RS256"
//           }
//           const privateKey = fs.readFileSync('./private.pem');
//           const token = jwt.sign({
//             id: user[0].dataValues.id,
//             iat: Math.floor(Date.now() / 1000) + 30
//           }, privateKey, header)
//           res.send(JSON.stringify(token));
//         } else {
//           res.status(422).send("Wrong login or password");
//         }
//       })
//     } else {
//       res.status(422).send("Wrong login or password");
//     }
//   })
// })

router.post("/", authenticate, (req, res) => {
  if (req.user === null) return res.status(400).end();
  const header = {
    algorithm: "RS256"
  };
  const token = jwt.sign({
      id: req.user.id,
      iat: Math.floor(Date.now() / 1000) + 30
    },
    privateKey,
    header
  );
  req.login(req.user, {
    session: true
  }, err => {
    if (err) {
      res.send(err);
    }
    return res.json({
      token
    });
  });
});

module.exports = router;