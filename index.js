const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const jwt = require('jsonwebtoken');
const login = require("./routes/login");
const registration = require("./routes/registration");
const cabinet = require("./routes/cabinet");
const logout = require("./routes/logout");
const app = express();
const port = 6969;

// const LIFE_TIME = 1000 * 60 * 15;
// const {
//   PORT = 6969,
//     SESS_NAME = "sid",
//     SESS_SECRET = "ssh!quiet,it'asecret!",
//     SESS_LIFETIME = LIFE_TIME
// } = process.env;


// app.use(
//   session({
//     name: SESS_NAME,
//     resave: false,
//     saveUninitialized: false,
//     secret: SESS_SECRET,
//     cookie: {
//       maxAge: SESS_LIFETIME,
//       sameSite: true,
//       secure: false
//     }
//   })
// );

// const redirectLogin = (req, res, next) => {
//   if (!req.session.userId) {
//     res.redirect("/login");
//   } else {
//     next();
//   }
// };

// const redirectCabinet = (req, res, next) => {
//   if (req.session.userId) {
//     res.redirect("/cabinet");
//   } else {
//     next();
//   }
// };

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use("/static", express.static(path.join(__dirname, "static")));

app.get("/", verifyToken, (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"))
});
app.get("/success", (req, res) => res.sendFile(path.join(__dirname + "/views/success.html")));

// app.use("/registration", redirectCabinet, registration);
// app.use("/login", redirectCabinet, login);
// app.use("/cabinet", redirectLogin, cabinet);
// app.use("/logout", redirectLogin, logout);

app.use("/registration", registration);
app.use("/login", login);
app.use("/cabinet", cabinet);
app.use("/logout", logout);

function verifyToken(req, res, next) {
  console.log(req.headers);
  next();

  // // Get auth header value
  // const bearerHeader = req.headers['auth-token'];
  // // Check if bearer is undefined
  // if (typeof bearerHeader !== 'undefined') {
  //   // Split at the space
  //   const bearer = bearerHeader.split(' ');
  //   // Get token from array
  //   const bearerToken = bearer[1];
  //   // Set the token
  //   req.token = bearerToken;
  //   // Next middleware
  //   next();
  // } else {
  //   // Forbidden
  //   res.sendStatus(403);
  // }

}


app.listen(port, () => console.log(`Listening port ${port}`));