const ApiError = require('../error/ApiError');
TypeService = require('../service/type/type-service')

class TypeController {
  async create(req, res, next) {
    const {name} = req.body;
    try {
      const type = await TypeService.create({name})
      return res.json(type);
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }

  async getAll(req, res, next) {
    try {
      const types = await TypeService.getAll();
      return res.json(types);
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }

  async delete(req, res, next) {
    const {id} = req.params;
    try {
      const type = await TypeService.delete({id})
      return res.json(type);
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }

  async update(req, res, next) {
    const {id} = req.params;
    const {newName} = req.body;
    try {
      const type = await TypeService.update({id, newName})
      await type.update({
        name: newName
      })
      return res.status(200).send();
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }
}

module.exports = new TypeController();
