const ApiError = require('../../error/ApiError');
const {User, Basket} = require('../../models/models');
const bcrypt = require('bcrypt');

class UserService {
  async registration({email, password, role}) {
    const candidate = await User.findOne({where: {email}})
    if (candidate) {
      throw ApiError.badRequest('Пользователь с таким email уже существует')
    }
    try {
      const hashPassword = await bcrypt.hash(password, 5)
      const user = await User.create({email, role, password: hashPassword})
      await Basket.create({userId: user.id})
      return user
    } catch (e) {
      if (e instanceof ApiError) {
        throw e;
      }
      throw ApiError.badRequest(e.message)
    }
  }

  async login({email, password}) {
    const user = await User.findOne({where: {email}})
    if (!user) {
      throw ApiError.internal('Пользователь с таким именем не найден')
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      throw ApiError.internal('Указан неверный пароль')
    }
    return user

  }
}

module.exports = new UserService()