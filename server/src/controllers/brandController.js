const ApiError = require('../error/ApiError');
const BrandService = require('../service/brand/brand-service')

class BrandController {
  async create(req, res, next) {
    const {name} = req.body;
    try {
      const brand = await BrandService.create({name});
      return res.json(brand);
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }

  async getAll(req, res, next) {
    try {
      const brands = await BrandService.getAll();
      return res.json(brands);
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }

  async delete(req, res, next) {
    const {id} = req.params;
    try {
      const brand = await BrandService.delete({id});
      return res.json(brand);
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }

  async update(req, res, next) {
    const {id} = req.params;
    const {newName} = req.body;
    try {
      await BrandService.update({ id, newName })
      return res.status(200).send();
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }
}

module.exports = new BrandController();
