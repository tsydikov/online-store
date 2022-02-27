const {Rating} = require("../models/models");
const ApiError = require("../error/ApiError");

class RatingController {
  async create(req, res, next) {
    const {rate, userId, deviceId} = req.body;
    try {
      const rating = await Rating.create({rate, userId, deviceId})
      return res.json(rating);
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    const ratings = await Rating.findAll();
    return res.json(ratings);
  }

  async getDeviceRating(req, res, next) {
    const {id} = req.params;
    try {
      const rating = await Rating.findAll(
        {
          where: {deviceId: id}
        }
      );
      return res.json(rating);
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getRatingByDeviceAndUser(req, res, next) {
    const {deviceId, userId} = req.query;
    try {
      const rating = await Rating.findAll(
        {
          where: {deviceId, userId}
        }
      );
      return res.json(rating);
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }

  }


  async delete(req, res, next) {
    const {id} = req.params;
    try {
      const rate = await Rating.destroy({where: {id}});
      return res.json(rate);
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new RatingController();