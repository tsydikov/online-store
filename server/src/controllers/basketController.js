const {BasketDevice, Basket} = require("../models/models");
const ApiError = require("../error/ApiError");

class BasketController {
    async create(req, res) {
        const {id, userId} = req.body;
        const basketDevice = await BasketDevice.create({deviceId: id, basketId: userId});
        return res.json(basketDevice);
    }

    async getAll(req, res) {
        const basket = await BasketDevice.findAll();
        return res.json(basket);
    }

    async delete(req, res) {
        const {id} = req.params;
        const basketItem = await BasketDevice.destroy({
            where: {
                basketId: id.split('&')[1],
                deviceId: id.split('&')[0]
            }
        });
        return res.json(basketItem);
    }
}

module.exports = new BasketController();