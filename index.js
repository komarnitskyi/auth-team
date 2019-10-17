const express = require("express");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const jwtAuthenticate = require("./helpers/authenticate").jwtAuthenticate;

const login = require("./routes/login");
const registration = require("./routes/registration");
const cabinet = require("./routes/cabinet");
const users = require("./routes/users");
const vacation = require("./routes/vacation");

const app = express();
const port = process.env.PORT || 6969;

require("./helpers/passport");

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
app.use(passport.initialize());
app.use(
  session({
    secret: "smile",
    saveUninitialized: true,
    resave: true
  })
);
app.use(passport.session());

app.use("/static", express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => res.sendFile(path.join(__dirname + "/index.html")));
app.get("/success", (req, res) => res.sendFile(path.join(__dirname + "/views/success.html")));

app.use("/registration", registration);
app.use("/login", login);
app.use("/cabinet", jwtAuthenticate, cabinet);
app.use("/users", jwtAuthenticate, users);
app.use("/vacation", jwtAuthenticate, vacation);

app.listen(port, () => console.log(`Listening port ${port}`));