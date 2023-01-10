const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};
const comparePassword = (password, hashedPassword) => {
  const compared = bcrypt.compareSync(password, hashedPassword);
  return compared;
};

module.exports = { hashPassword, comparePassword };
