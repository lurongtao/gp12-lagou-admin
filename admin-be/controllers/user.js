const userModel = require('../models/user')
const toolsUtil = require('../utils/tools')
const tokenUtil = require('../utils/token')

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
        
        let token = tokenUtil.sign({
          username
        })

        res.set('X-Access-Token', token)

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
    let token = req.get('x-access-token')
    let result = await tokenUtil.verify(token)
    if (result) {
      res.render('succ', {
        data: JSON.stringify({
          msg: '登录成功.',
          username: result.username
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
    res.set('content-type', 'application/json; charset=utf-8')
    req.session = null
    res.render('succ', {
      data: JSON.stringify({
        msg: '用户登出成功.'
      })
    })
  }
}