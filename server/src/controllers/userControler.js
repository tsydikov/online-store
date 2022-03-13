const ApiError = require('../error/ApiError')
const TokenService = require('../service/token/token-service')
const UserService = require('../service/user/user-service')

class UserController {
  async registration(req, res, next) {
    const {email, password, role} = req.body
    if (!email || !password) {
      return next(ApiError.badRequest('Некорректный email или password'))
    }
    try {
      const user = await UserService.registration({email, password, role})
      const token = TokenService.generateJwt(user.id, user.email, user.role)
      return res.json({token})
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async login(req, res, next) {
    const {email, password} = req.body
    try {
      const user = await UserService.login({email, password})
      const token = TokenService.generateJwt(user.id, user.email, user.role)
      return res.json({token})
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async check(req, res, next) {
    try {
      const token = TokenService.generateJwt(req.user.id, req.user.email, req.user.role)
      return res.json({token})
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new UserController()