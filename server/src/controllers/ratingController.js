const ApiError = require('../error/ApiError');
const RatingService = require('../service/rating/rating-service')

class RatingController {
  async create(req, res, next) {
    const {rate, userId, deviceId} = req.body;
    try {
      const rating = await RatingService.create({rate, userId, deviceId})
      return res.json(rating);
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }

  async getAll(req, res, next) {
    try {
      const ratings = await RatingService.getAll();
      return res.json(ratings);
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }

  async getDeviceRating(req, res, next) {
    const {id} = req.params;
    try {
      const rating = await RatingService.getDeviceRating({deviceId: id});
      return res.json(rating);
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }

  async getRatingByDeviceAndUser(req, res, next) {
    const {deviceId, userId} = req.query;
    try {
      const rating = await RatingService.getRatingByDeviceAndUser({deviceId, userId});
      return res.json(rating);
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }

  async delete(req, res, next) {
    const {id} = req.params;
    try {
      const rate = await RatingService.delete({id});
      return res.json(rate);
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }
}

module.exports = new RatingController();