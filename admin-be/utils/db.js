const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/lagou', { useNewUrlParser: true })

module.exports = mongoose