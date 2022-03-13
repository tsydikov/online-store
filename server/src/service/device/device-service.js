const ApiError = require('../../error/ApiError');
const {Device, DeviceInfo} = require('../../models/models');
const {Sequelize} = require('sequelize');

class DeviceService {
  async create({name, price, brandId, typeId, info, fileName}) {
    try {
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
      return device
    } catch (e) {
      throw ApiError.badRequest(e.message)
    }
  }

  async update({id, name, price, brandId, typeId, info, fileName}) {
    try {
      const editDevice = await Device.findOne({
        where: {id: id},
        include: [{model: DeviceInfo, as: 'info'}]
      })

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
    } catch (e) {
      throw ApiError.badRequest(e.message)
    }
  }

  async getAll({brandId, typeId, limit, page, search}) {
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
      return devices
    } catch (e) {
      throw ApiError.badRequest(e.message)
    }
  }

  async getOne({id}) {
    try {
      return await Device.findOne({
        where: {id},
        include: [{model: DeviceInfo, as: 'info'}]
      })
    } catch (e) {
      throw ApiError.badRequest(e.message)
    }
  }

  async getOneByName({name}) {
    try {
      return await Device.findOne({
        where: {name: name},
        include: [{model: DeviceInfo, as: 'info'}]
      })
    } catch (e) {
      throw ApiError.badRequest(e.message)
    }
  }

  async delete({id}) {
    try {
      await DeviceInfo.destroy({where: {deviceId: id}})
      return await Device.destroy({where: {id}})
    } catch (e) {
      throw ApiError.badRequest(e.message)
    }
  }

  async updateDeviceRating({id, rating}) {
    try {
      const editDevice = await Device.findOne({
        where: {id: id},
        include: [{model: DeviceInfo, as: 'info'}]
      })
      await editDevice.update({
        rating: rating,
      })
    } catch (e) {
      throw ApiError.badRequest(e.message)
    }
  }
}

module.exports = new DeviceService()