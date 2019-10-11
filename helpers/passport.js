const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const fs = require("fs");

const Users = require("../helpers/sequelizeInit").Users;
const publicKey = fs.readFileSync("./public.pem");

const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: publicKey
  },
  function(jwtPayload, done) {
    console.log(jwtPayload);

    return Users.findOneById(jwtPayload.id)
      .then(user => {
        return done(null, user);
      })
      .catch(err => {
        return done(err, null);
      });
  }
);

const localStrategy = new LocalStrategy(
  {
    usernameField: "login",
    passwordField: "password"
  },
  function(login, password, done) {
    Users.findOne({ where: { login: login } })
      .then(user => {
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (user.password !== password) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      })
      .catch(err => {
        if (err) {
          return done(err);
        }
      });
  }
);

passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("86 id ", id);

  Users.findOne({ where: { id } }).then(user => {
    done(null, user);
    return null;
  });
});
