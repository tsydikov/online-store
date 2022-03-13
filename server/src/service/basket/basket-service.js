const ApiError = require('../../error/ApiError');
const {BasketDevice} = require('../../models/models');

class BasketService {
  async create({deviceId, basketId}) {
    const deviceInBasket = await BasketDevice.findOne({
      where: {
        deviceId,
        basketId,
      }
    })
    if (deviceInBasket) {
      throw ApiError.badRequest('device already in basket')
    }
    try {
      return await BasketDevice.create({deviceId, basketId});
    } catch (e) {
      throw ApiError.badRequest(e.message)
    }
  }

  async getAll() {
    try {
      return await BasketDevice.findAll()
    } catch (e) {
      throw ApiError.badRequest(e.message)
    }
  }

  async delete({ basketId, deviceId}) {
    try {
      return await BasketDevice.destroy({
        where: {
          basketId,
          deviceId,
        }
      });
    } catch (e) {
      throw ApiError.badRequest(e.message)
    }
  }

}

module.exports = new BasketService()