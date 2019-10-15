const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const Users = require("../helpers/sequelizeInit.js").Users;
const Op = require("../helpers/sequelizeInit.js").Op;
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "./../views/registration.html"));
});

router.post("/", (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const passwordToSave = bcrypt.hashSync(req.body.password, salt);
  const repeatPasswordToSave = bcrypt.hashSync(req.body.repeatPassword, salt);

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash("B4c0//", salt, function(err, hash) {});
  });

  const regReqObj = {
    name: req.body.name,
    surname: req.body.surname,
    login: req.body.login,
    password: passwordToSave,
    email: req.body.email
  };
  if (req.body === null) return res.status(400).end();
  Users.findAll({
    where: {
      [Op.or]: [
        {
          login: regReqObj.login
        },
        {
          email: regReqObj.email
        }
      ]
    }
  })
    .then(arr => {
      const errArr = [];
      if (arr.length) {
        arr.map(el => {
          if (el.dataValues.login === regReqObj.login)
            errArr.push({
              path: "login",
              message: "Login already used!"
            });
          if (el.dataValues.email === regReqObj.email)
            errArr.push({
              path: "email",
              message: "Email address already in use!"
            });
        });
      }
      if (regReqObj.password !== repeatPasswordToSave)
        errArr.push({
          path: "repeatPassword",
          message: "Passwords don't match!"
        });
      return errArr;
    })
    .then(arr => {
      if (arr.length) {
        res.status(400).send(JSON.stringify(arr));
      } else {
        Users.create(regReqObj)
          .then(() => {
            res.status(200).send("Registration success");
          })
          .catch(Sequelize.ValidationError, err => {
            res.status(400).send(
              JSON.stringify([
                {
                  path: err.errors[0].path,
                  message: err.errors[0].message
                }
              ])
            );
          });
      }
    });
});

module.exports = router;
