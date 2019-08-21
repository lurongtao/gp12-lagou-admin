var express = require('express')
var router = express.Router()

const positionController = require('../controllers/position')
const userController = require('../controllers/user')

router.get('/list', userController.isSignin, positionController.list)

module.exports = router