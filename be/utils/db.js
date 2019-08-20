const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/lagou', { useNewUrlParser: true }) // lagou是数据库的名字

module.exports = mongoose