const userModel = require('../models/users')

const tools = require('../utils/tools')

module.exports = {
  async signup(req, res, next) {
    res.set('content-type', 'application/json;charset=utf-8')

    let { password, username } = req.body

    // 判断用户是否存在
    let result = await userModel.findOne(username)
    if (!result) {
      // 密码加密
      let newPassword = await tools.crypt(password)

      // 保存数据到数据库
      await userModel.save({
        username,
        password: newPassword
      })

      // 给前端返回接口
      res.render('succ', {
        data: JSON.stringify({
          msg: '用户注册成功~'
        })
      })
    }

    res.render('fail', {
      data: JSON.stringify({
        msg: '用户已存在~'
      })
    })
  },

  async signin(req, res, next) {
    res.set('content-type', 'application/json;charset=utf-8')
    let { username, password } = req.body

    // 从数据库里根据用户名取出用户信息
    let result = await userModel.findOne(username)
    if (result) {
      if (await tools.compare(password, result.password)) {
        res.render('succ', {
          data: JSON.stringify({
            msg: '用户登录成功~',
            username
          })
        })
      } else {
        res.render('fail', {
          data: JSON.stringify({
            msg: '账号或密码错误~'
          })
        })
      }
    } else {
      res.render('fail', {
        data: JSON.stringify({
          msg: '账号或密码错误~'
        })
      })
    }
  }
}