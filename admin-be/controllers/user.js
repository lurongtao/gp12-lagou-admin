const userModel = require('../models/user')
const toolsUtil = require('../utils/tools')

module.exports = {
  async signup(req, res, next) {
    res.set('content-type', 'application/json;charset=utf-8')
    
    let { username, password } = req.body
    let result = await userModel.findOne(username)
    if (result) {
      res.render('fail', {
        data: JSON.stringify({
          msg: '此用户已经注册.'
        })
      })
    } else {
      let newPassword = toolsUtil.hash(password)
      let result = await userModel.save({
        username,
        password: newPassword
      })
      if (result) {
        res.render('succ', {
          data: JSON.stringify({
            msg: '用户注册成功.'
          })
        })
      } else {
        res.render('fail', {
          data: JSON.stringify({
            msg: '用户注册失败.'
          })
        })
      }
    }
  },

  async signin(req, res, next) {
    res.set('content-type', 'application/json;charset=utf-8')

    let { username, password } = req.body

    let result = await userModel.findOne(username)

    if (result) {
      if (await toolsUtil.compare(password, result.password)) {
        req.session.username = username
        res.render('succ', {
          data: JSON.stringify({
            msg: '用户登录成功.',
            username
          })
        })
      } else {
        res.render('fail', {
          data: JSON.stringify({
            msg: '用户登录失败.'
          })
        })
      }
    } else {
      res.render('fail', {
        data: JSON.stringify({
          msg: '用户登录失败.'
        })
      })
    }
  },

  async isSignin(req, res, next) {
    res.set('content-type', 'application/json; charset=utf-8')

    let username = req.session.username
    if (username) {
      next()
      res.render('succ', {
        data: JSON.stringify({
          msg: '用户有权限',
          username
        })
      })
    } else {
      res.render('fail', {
        data: JSON.stringify({
          msg: '用户没有权限'
        })
      })
    }
  },

  async signout(req, res, next) {
    req.session = null
    res.render('succ', {
      data: JSON.stringify({
        msg: '用户登出成功.'
      })
    })
  }
}