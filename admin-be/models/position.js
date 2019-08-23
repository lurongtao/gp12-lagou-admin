const mongoose = require('../utils/db')

const Model = mongoose.model('positions', {
  companyName: String,
  positionName: String,
  city: String,
  salary: String,
  createTime: String
})

module.exports = {
  find({start, count}) {
    return {
      list: Model.find({}).sort({_id: -1}).limit(~~count).skip(~~start),
      total: Model.count({})
    }
  },

  findone(id) {
    return Model.findById(id)
  },

  save(data) {
    let model = new Model(data)
    return model.save()
  },

  put(data) {
    return Model.updateOne({_id: data.id}, data)
  },

  delete(id) {
    return Model.deleteOne({_id: id})
  }
}