import SMERouter from 'sme-router'

const router = new SMERouter('router-view', 'hash')

import Home from '../controllers/home'
import Position from '../controllers/position'

// sme-router 中间件
router.use((req, res, next) => {
  $(`.sidebar-menu li.nav a[href="/#${req.url}"]`)
    .parent()
    .addClass('active')
    .siblings()
    .removeClass('active')
})

router.route('/', Home.render)
router.route('/position', Position.render)

// 将页面导航到 /, 默认route方法不具备自动导航的功能
router.redirect('/')

export default router