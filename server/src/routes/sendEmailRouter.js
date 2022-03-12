const Router = require('express')
const router = new Router()
const SendEmailController = require('../controllers/sendEmailController')

router.post('/', SendEmailController.sendEmail)

module.exports = router