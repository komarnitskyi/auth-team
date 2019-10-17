const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const checkPassword = async (userPass, password) => {
  const ans = await bcrypt.compare(password, userPass).then(isMatch => {
    return isMatch;
  });
  return ans;
};

const hashPassword = password => {
  return bcrypt.hashSync(password, salt);
};

module.exports = {
  checkPassword,
  hashPassword
};