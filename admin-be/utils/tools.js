const bcrypt = require('bcrypt')

module.exports = {
  hash(password) {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)
    return hash
  },

  compare(originalPassword, hash) {
    return bcrypt.compare(originalPassword, hash)
  }
}