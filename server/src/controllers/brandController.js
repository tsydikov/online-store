const { Brand } = require("../models/models");
const ApiError = require("../error/ApiError");

class BrandController {
  async create(req, res) {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    return res.json(brand);
  }

  async getAll(req, res) {
    const brands = await Brand.findAll();
    return res.json(brands);
  }
  async delete(req, res) {
    const { id } = req.params;
    const brand = await Brand.destroy({ where: { id } });
    return res.json(brand);
  }
  async update(req, res) {
    const { id } = req.params;
    const { newName } = req.body;
    const brand = await Brand.findOne({
      where: { id: id },
    });
    await brand.update({
      name: newName
    })
    return res.status(200).send();
  }
}

module.exports = new BrandController();
