const passport = require("passport");

require("../helpers/passport");

const jwtAuthenticate = passport.authenticate("jwt", {
  session: true
});
const loginAuthenticate = passport.authenticate("local", {
  session: true
});
module.exports = {
  jwtAuthenticate,
  loginAuthenticate
};
