const Router = require('express')
const basketController = require("../controllers/basketController")
const router = new Router()

router.post('/', basketController.create)
router.delete('/:id', basketController.delete)
router.get('/', basketController.getAll)

module.exports = router