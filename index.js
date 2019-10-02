const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");

const login = require("./routes/login");
const registration = require("./routes/registration");
const cabinet = require("./routes/cabinet");
const logout = require("./routes/logout");

const LIFE_TIME = 1000 * 60 * 15;
const {
  PORT = 6969,

  SESS_NAME = "sid",
  SESS_SECRET = "ssh!quiet,it'asecret!",
  SESS_LIFETIME = LIFE_TIME
} = process.env;

app.use(
  session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: true,
      secure: true
    }
  })
);

const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    (req, res) => res.sendFile(path.join(__dirname + "/views/cabinet.html"));
    next();
    (req, res) => res.sendFile(path.join(__dirname + "/views/cabinet.html"));
  }
  (req, res) => res.sendFile(path.join(__dirname + "/views/cabinet.html"));
};
(req, res) => res.sendFile(path.join(__dirname + "/views/cabinet.html"));
const redirectCabinet = (req, res, next) => {
  if (req.session.userId) {
    res.redirect("/cabinet");
  } else {
    next();
  }
};

// app.use((req, res, next) =>{
//   const { userId } = req.session
//   if(userId){
//     res.locals.user =
//   }
// });

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use("/static", express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => res.sendFile(path.join(__dirname + "/index.html")));
app.get("/success", (req, res) => res.sendFile(path.join(__dirname + "/views/success.html")));

app.use("/registration", redirectCabinet, registration);
app.use("/login", redirectCabinet, login);
app.get("/cabinet", redirectLogin, cabinet);
// app.use("/logout", redirectLogin, logout);

app.listen(PORT, () => console.log(`Listening port ${PORT}`));
