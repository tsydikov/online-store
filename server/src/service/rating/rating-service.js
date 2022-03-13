const {Rating} = require('../../models/models');
const ApiError = require('../../error/ApiError');

class RatingService {
  async create({rate, userId, deviceId}) {
    try {
      return await Rating.create({rate, userId, deviceId});
    } catch (e) {
      throw ApiError.badRequest(e.message)
    }
  }

  async getAll() {
    try {
      return await Rating.findAll()
    } catch (e) {
      throw ApiError.badRequest(e.message)
    }
  }

  async getDeviceRating({deviceId}) {
    try {
      return await Rating.findAll(
        {
          where: {deviceId}
        }
      )
    } catch (e) {
      throw ApiError.badRequest(e.message)
    }
  }

  async getRatingByDeviceAndUser({ deviceId, userId }) {
    try {
      return await Rating.findAll(
        {
          where: {deviceId, userId}
        }
      )
    } catch (e) {
      throw ApiError.badRequest(e.message)
    }
  }

  async delete({id}) {
    try {
      return await Rating.destroy({where: {id}});
    } catch (e) {
      throw ApiError.badRequest(e.message)
    }
  }
}

module.exports = new RatingService()