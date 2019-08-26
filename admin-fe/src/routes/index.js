import SMERouter from 'sme-router'

import homeController from '../controllers/home'
import positionController from '../controllers/position'
import userController from '../controllers/user'

import activeNavUtil from '../utils/active-nav'

const router = new SMERouter('router-view', 'hash')

router.use(activeNavUtil)

router.route('/home', homeController.render)
router.route('/position', positionController.render)
router.route('/position_add', positionController.add)
router.route('/position_edit', positionController.edit)

router.redirect('/home')

// 渲染用户信息的模板
userController.render()