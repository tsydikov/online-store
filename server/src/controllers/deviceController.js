const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError')
const {Sequelize} = require("sequelize");

class DeviceController {
  async create(req, res, next) {
    try {
      let {name, price, brandId, typeId, info} = req.body
      const {img} = req.files
      let fileName = uuid.v4() + ".jpg"
      await img.mv(path.resolve(__dirname, '..', 'static', fileName))

      const device = await Device.create({name, price, brandId, typeId, img: fileName})

      if (info) {
        info = JSON.parse(info)
        info.forEach(i =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id
          })
        )
      }
      return res.json(device)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async update(req, res, next) {
    try {
      let {id, name, price, img, brandId, typeId, info} = req.body
      let fileName
      const editDevice = await Device.findOne(
        {
          where: {id: id},
          include: [{model: DeviceInfo, as: 'info'}]
        },
      )
      if (img) {
        fileName = img
      } else {
        const {img} = req.files
        fileName = uuid.v4() + ".jpg"
        await img.mv(path.resolve(__dirname, '..', 'static', fileName))
      }
      await editDevice.update({
        name: name,
        price: price,
        brandId: brandId,
        typeId: typeId,
        img: fileName,
      })
      if (info) {
        info = JSON.parse(info)
        for (const i of info) {
          const infoOfDevice = await DeviceInfo.findOne({
            where: {id: i.id}
          })
          if (infoOfDevice === null) {
            await DeviceInfo.create({
              title: i.title,
              description: i.description,
              deviceId: editDevice.id
            })
          } else {
            await infoOfDevice.update({
              title: i.title,
              description: i.description,
            })
          }
        }
      }
      return res.status(200).send();
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res, next) {
    let {brandId, typeId, limit, page, search} = req.query
    page = page || 1
    limit = limit || 9
    let offset = page * limit - limit
    let devices;
    try {
      if (search) {
        devices = await Device.findAndCountAll({where: {name: {[Sequelize.Op.iLike]: `%${search}%`}}})
      }
      if (!brandId && !typeId) {
        devices = await Device.findAndCountAll({where: {name: {[Sequelize.Op.iLike]: `%${search}%`}}, limit, offset})
      }
      if (brandId && !typeId) {
        devices = await Device.findAndCountAll({
          where: {brandId, name: {[Sequelize.Op.iLike]: `%${search}%`}},
          limit,
          offset
        })
      }
      if (!brandId && typeId) {
        devices = await Device.findAndCountAll({
          where: {typeId, name: {[Sequelize.Op.iLike]: `%${search}%`}},
          limit,
          offset
        })
      }
      if (brandId && typeId) {
        devices = await Device.findAndCountAll({
          where: {brandId, typeId, name: {[Sequelize.Op.iLike]: `%${search}%`}},
          limit,
          offset
        })
      }
      return res.json(devices)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getOne(req, res, next) {
    const {id} = req.params
    try {
      const device = await Device.findOne(
        {
          where: {id},
          include: [{model: DeviceInfo, as: 'info'}]
        }
      )
      return res.json(device)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getOneByName(req, res, next) {
    const {name} = req.query
    if (name === '') {
      return next(ApiError.badRequest('no name in request'))
    }
    try {
      const device = await Device.findOne(
        {
          where: {name: name},
          include: [{model: DeviceInfo, as: 'info'}]
        },
      )
      return res.json(device)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async delete(req, res, next) {
    try {
      const {id} = req.params;
      await DeviceInfo.destroy({where: {deviceId: id}})
      const device = await Device.destroy({where: {id}});
      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async updateRating(req, res, next) {
    try {
      let {rating} = req.body
      console.log(rating)
      const {id} = req.params
      const editDevice = await Device.findOne(
        {
          where: {id: id},
          include: [{model: DeviceInfo, as: 'info'}]
        },
      )
      await editDevice.update({
        rating: rating,
      })
      return res.status(200).send();
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new DeviceController() 