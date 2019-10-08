const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const login = require("./routes/login");
const registration = require("./routes/registration");
const cabinet = require("./routes/cabinet");
const app = express();
const port = 6969;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use("/static", express.static(path.join(__dirname, "static")));
app.use("/registration", registration);
app.use("/login", login);
app.use("/cabinet", cabinet);

app.get("/", (req, res) => res.sendFile(path.join(__dirname + "/index.html")));
app.get("/success", (req, res) => res.sendFile(path.join(__dirname + "/views/success.html")));

app.listen(port, () => console.log(`Listening port ${port}`));