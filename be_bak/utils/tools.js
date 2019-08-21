const bcrypt = require('bcrypt')

module.exports = {
  crypt(myPlaintextPassword) {
    return new Promise((resolve) => {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(myPlaintextPassword, salt, (err, hash) => {
          resolve(hash)
        })
      })
    })
  },

  compare(myPlaintextPassword, hash) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
        resolve(res)
      })
    })
  }
}