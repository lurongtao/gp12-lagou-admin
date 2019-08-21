const mongoose = require('../utils/db')

const Model = mongoose.model('users', {
  username: String,
  password: String
})

module.exports = {
  findOne(username) {
    return Model.findOne({username})
  },

  save({username, password}) {
    let user = new Model({
      username, 
      password
    })
    return user.save()
  }
}