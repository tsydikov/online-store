const nodemailer = require('nodemailer')
const getHtmlTemplate = require('./html-template')

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      }
    })
  }

  async sendOrder(orderDetails) {
      await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.MAIL_RECIPIENT,
      subject: 'Информация о заказе',
      text: '',
      html: getHtmlTemplate(orderDetails)

    })
  }
}

module.exports = new MailService();