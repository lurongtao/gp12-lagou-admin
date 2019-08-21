module.exports = {
  list(req, res, next) {
    res.json({
      ret: true,
      data: [
        {
          task: 'aaa'
        },
        {
          task: 'bbb'
        },
        {
          task: 'ccc'
        }
      ]
    })
  }
}