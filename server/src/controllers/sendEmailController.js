const ApiError = require('../error/ApiError');
const MailService = require('../service/mail/mail-service')

class SendEmailController {
  async sendEmail(req, res, next) {
    const orderDetails = req.body
    try {
      await MailService.sendOrder(orderDetails)
      res.status(200).json({ message: 'Email have been sent' });
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new SendEmailController()