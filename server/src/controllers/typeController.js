const {Type} = require("../models/models");
const ApiError = require("../error/ApiError");

class TypeController {
  async create(req, res) {
    const {name} = req.body;
    const type = await Type.create({name});
    return res.json(type);
  }

  async getAll(req, res) {
    const types = await Type.findAll();
    return res.json(types);
  }

  async delete(req, res) {
    const {id} = req.params;
    const type = await Type.destroy({where: {id},});
    return res.json(type);
  }

  async update(req, res) {
    const {id} = req.params;
    const {newName} = req.body;
    const type = await Type.findOne({
      where: {id: id},
    });
    await type.update({
      name: newName
    })
    return res.status(200).send();
  }
}

module.exports = new TypeController();
