const ApiError = require('../../error/ApiError');
const {Brand} = require('../../models/models');

class BrandService {
  async create({ name }) {
    try {
      return await Brand.create({name})
    } catch (e) {
      throw ApiError.badRequest(e.message)
    }
  }
  async getAll() {
    try {
      return await Brand.findAll()
    } catch (e) {
      throw ApiError.badRequest(e.message)
    }
  }
  async delete({ id }) {
    try {
      return await Brand.destroy({where: {id}})
    } catch (e) {
      throw ApiError.badRequest(e.message)
    }
  }
  async update({ id, newName }) {
    try {
      const brand = await Brand.findOne({
        where: { id },
      });
      await brand.update({
        name: newName
      })
    } catch (e) {
      throw ApiError.badRequest(e.message)
    }
  }
}

module.exports = new BrandService()