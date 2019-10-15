const bcrypt = require("bcryptjs");

const checkPassword = async (userPass, password) => {
  const ans = await bcrypt.compare(password, userPass).then(isMatch => {
    return isMatch;
  });
  return ans;
};

const hashPassword = password => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

module.exports = {
  checkPassword,
  hashPassword
};
