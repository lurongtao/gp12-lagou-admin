const tokenUtil = require('../utils/token')
module.exports = {
  async auth(req, res, next) {
    res.set('content-type', 'application/json; charset=utf-8')

    let token = req.get('x-access-token')
    let result = await tokenUtil.verify(token)

    if (result) {
      next()
    } else {
      res.render('fail', {
        data: JSON.stringify({
          msg: '用户没有权限'
        })
      })
    }
  }
}