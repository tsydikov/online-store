const {BasketDevice} = require("../models/models");
const ApiError = require("../error/ApiError");

class BasketController {
    async create(req, res,next) {
        const {id, userId} = req.body;
        try {
            const deviceInBasket = await BasketDevice.findOne({
                where : {
                    deviceId: id,
                    basketId: userId,
                }
            })
            if (deviceInBasket) return next(ApiError.badRequest('device already in basket'))
            const basketDevice = await BasketDevice.create({deviceId: id, basketId: userId});
            return res.json(basketDevice);
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res) {
        const basket = await BasketDevice.findAll();
        return res.json(basket);
    }

    async delete(req, res, next) {
        const { basketId, deviceId } = req.query;
        try {
            const basketItem = await BasketDevice.destroy({
                where: {
                    basketId,
                    deviceId,
                }
            });
            return res.json(basketItem);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new BasketController();