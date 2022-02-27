const Router = require('express')
const deviceController = require('../controllers/deviceController')
const checkRole = require('../middleware/checkRoleMiddleware')
const router = new Router()

router.post('/', checkRole('ADMIN'), deviceController.create)
router.delete('/:id', checkRole('ADMIN'), deviceController.delete)
router.get('/name/', checkRole('ADMIN'), deviceController.getOneByName)
router.get('/', deviceController.getAll)
router.get('/id/:id', deviceController.getOne)
router.patch('/:id', checkRole('ADMIN'), deviceController.update)
router.patch('/rating/:id', deviceController.updateRating)

module.exports = router