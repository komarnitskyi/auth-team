const express = require("express");
const path = require("path");

const router = express.Router();

require("../helpers/passport");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "./../views/cabinet.html"));
});

router.post("/", (req, res) => {
  if (req.user === null) return res.status(400).end();
  res.send(JSON.stringify(req.user));
});

module.exports = router;
