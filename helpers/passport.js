const passport = require("passport");
const fs = require("fs");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const Users = require("../helpers/sequelizeInit").Users;
const Levels = require("../helpers/sequelizeInit").Levels;
const checkPassword = require("./cryptPassword").checkPassword;

const publicKey = fs.readFileSync("./public.pem");

const jwtStrategy = new JwtStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: publicKey
  },
  function (jwtPayload, done) {
    if (Math.floor(Date.now() / 1000) > jwtPayload.iat) return done(null, false, {
      message: "Token lifecycling end"
    });
    return Users.findOne({
        raw: true,
        where: {
          id: jwtPayload.id
        },
        attributes: ['id', 'name', 'surname', 'login', 'email', 'joinedAt',
          'level.level'
        ],
        include: [{
          model: Levels,
          attributes: []
        }]
      })
      .then(user => {
        return done(null, user);
      })
      .catch(err => {
        return done(err, null);
      });
  }
);

const localStrategy = new LocalStrategy({
    usernameField: "login",
    passwordField: "password"
  },
  function (login, password, done) {
    Users.findOne({
        where: {
          login: login
        }
      })
      .then(user => {
        if (!user) {
          return done(null, false, {
            message: "Incorrect username."
          });
        }
        if (!checkPassword(user.password, password)) {
          return done(null, false, {
            message: "Incorrect password."
          });
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
  Users.findOne({
    where: {
      id
    }
  }).then(user => {
    done(null, user);
    return null;
  });
});