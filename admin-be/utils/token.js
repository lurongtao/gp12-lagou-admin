const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

// 生成token：非对称加密
module.exports = {
  sign (payload) {
    let privateKey = fs.readFileSync(path.resolve(__dirname, './key/rsa_private_key.pem'))
    let token = jwt.sign(payload, privateKey, { algorithm: 'RS256'})
    return token
  },

  verify (token) {
    return new Promise((resolve, reject) => {
      let publicKey = fs.readFileSync(path.resolve(__dirname, './key/rsa_public_key.pem'))
      jwt.verify(token, publicKey, (err, decoded) => {
        if (err) {
          resolve(false)
        } else {
          resolve(decoded)
        }
      })
    })
  }
}