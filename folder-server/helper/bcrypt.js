const bcrypt = require('bcrypt');

function createHash(password) {
  return bcrypt.hashSync(password, 10);
}

function compareHash(password, hash) {
  return bcrypt.compareSync(password, hash);
}

module.exports = { createHash, compareHash };