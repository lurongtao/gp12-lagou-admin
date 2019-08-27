const path = require('path')
const strRandom = require('string-random')

const multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/uploads/'))
  },
  filename: function (req, file, cb) {
    let filename = strRandom(8) + '-' + Date.now() + file.originalname.substr(file.originalname.lastIndexOf('.'))
    
    // 用户提交了图片，需要把图片文件名传到下个中间件入库
    req.filename = filename

    cb(null, filename)
  }
})

function fileFilter (req, file, cb) {
  let index = ['image/jpeg', 'image/jpg', 'image/gif', 'image/png'].indexOf(file.mimetype)
  if (index === -1) {
    cb(null, false)
    cb(new Error('文件类型必须是.jpg, .png, .gif, .jpeg'))
  } else {
    cb(null, true)
  }
}

let upload = multer({
  storage,
  fileFilter
}).single('companyLogo')

module.exports = (req, res, next) => {
  upload (req, res, function (err) {
    if (err) {
      res.render('fail', {
        data: JSON.stringify({
          msg: err.message
        })
      })
    } else {
      // 中间件栈传参
      // 用户在前端没有选择图片
      if (req.body['companyLogo'] === '') {
        // 删除前端提交过来的空的companyLogo
        delete req.body['companyLogo']
      }

      next()
    }
  })
}