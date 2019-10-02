const express = require("express");
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
Users.init(
  {},
  {
    sequelize,
    modelName: "users"
  }
);

const SESS_NAME = "sid";

router.get("/", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(422).end();
    } else {
      res.clearCookie(SESS_NAME);
      res.redirect("/");
    }
  });
});

module.exports = router;
