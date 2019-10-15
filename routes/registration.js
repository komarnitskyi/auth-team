const express = require("express");
const path = require("path");
const Sequelize = require("../helpers/sequelizeInit.js").Sequelize;
const Users = require("../helpers/sequelizeInit.js").Users;
const Op = require("../helpers/sequelizeInit.js").Op;
const hashPassword = require("../helpers/cryptPassword").hashPassword;
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "./../views/registration.html"));
});

router.post("/", (req, res) => {
  const errArr = [];
  if (req.body.password !== req.body.repeatPassword) {
    errArr.push({
      path: "repeatPassword",
      message: "Passwords don't match!"
    });
    return errArr;
  }

  const passwordToSave = hashPassword(req.body.password);

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
