const {Type} = require('../../models/models');
const ApiError = require('../../error/ApiError');

class TypeService {
  async create({ name }) {
    try {
      return await Type.create({name})
    } catch (e) {
      throw ApiError.badRequest(e.message)
    }
  }
  async getAll() {
    try {
      return await Type.findAll()
    } catch (e) {
      throw ApiError.badRequest(e.message)
    }
  }
  async delete({ id }) {
    try {
      return await Type.destroy({where: {id}})
    } catch (e) {
      throw ApiError.badRequest(e.message)
    }
  }
  async update({ id, newName}) {
    try {
      const type = await Type.findOne({
        where: { id },
      });
      await type.update({
        name: newName
      })
    } catch (e) {
      throw ApiError.badRequest(e.message)
    }
  }
}

module.exports = new TypeService()