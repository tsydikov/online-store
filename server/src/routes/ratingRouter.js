const Router = require('express')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')
const ratingController = require('../controllers/ratingController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, ratingController.create)
// router.delete('/:id', checkRole('ADMIN'), )
// router.patch('/:id', )
router.get('/', ratingController.getAll)
router.get('/device/:id', ratingController.getDeviceRating)
router.get('/du/',  authMiddleware, ratingController.getRatingByDeviceAndUser)
router.delete('/:id', ratingController.delete)


module.exports = router