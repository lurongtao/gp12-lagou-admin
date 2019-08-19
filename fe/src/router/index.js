import SMERouter from 'sme-router'

const router = new SMERouter('router-view', 'hash')

import Home from '../controllers/home'
import Position from '../controllers/position'

router.route('/', Home.render)
router.route('/position', Position.render)

router.redirect('/')

export default router