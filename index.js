const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const login = require("./routes/login");
const registration = require("./routes/registration");
const cabinet = require("./routes/cabinet");
const cors = require("cors");
const users = require("./routes/users");
const vacation = require("./routes/vacation");

const app = express();
const port = 6969;

app.use(
  cors({
    allowedHeaders: ["Content-Type", "Authorization"],
    origin: "*",
    methods: [`GET`, `POST`, `PATCH`, `DELETE`]
  })
);
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
app.use("/users", users);
app.use("/vacation", vacation);

app.get("/", (req, res) => res.sendFile(path.join(__dirname + "/index.html")));
app.get("/success", (req, res) => res.sendFile(path.join(__dirname + "/views/success.html")));

app.listen(port, () => console.log(`Listening port ${port}`));
