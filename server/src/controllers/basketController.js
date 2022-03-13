const BasketService = require('../service/basket/basket-service')
const ApiError = require('../error/ApiError');

class BasketController {
  async create(req, res, next) {
    const {id, userId} = req.body;
    try {
      const basketDevice = await BasketService.create({deviceId: id, basketId: userId});
      return res.json(basketDevice);
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }

  async getAll(req, res, next) {
    try {
      const basket = await BasketService.getAll()
      return res.json(basket);
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }

  async delete(req, res, next) {
    const {basketId, deviceId} = req.query;
    try {
      const basketItem = await BasketService.delete({basketId, deviceId})
      return res.json(basketItem);
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }
}

module.exports = new BasketController();