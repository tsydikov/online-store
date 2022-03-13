const ApiError = require('../error/ApiError')
const FileService = require('../service/file/file-service')
const DeviceService = require('../service/device/device-service')

class DeviceController {
  async create(req, res, next) {
    let {name, price, brandId, typeId, info} = req.body
    const {img} = req.files
    try {
      const fileName = await FileService.putFile(img)
      const device = await DeviceService.create({name, price, brandId, typeId, info, fileName})
      return res.json(device)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async update(req, res, next) {
    let {id, name, price, img, brandId, typeId, info} = req.body
    try {
      let fileName
      if (img) {
        fileName = img
      } else {
        const {img} = req.files
        fileName = await FileService.putFile(img)
      }
      await DeviceService.update({id, name, price, brandId, typeId, info, fileName})
      return res.status(200).send();
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res, next) {
    let {brandId, typeId, limit, page, search} = req.query
    try {
      const devices = await DeviceService.getAll({brandId, typeId, limit, page, search})
      return res.json(devices)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getOne(req, res, next) {
    const {id} = req.params
    try {
      const device = await DeviceService.getOne({id})
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
      const device = await DeviceService.getOneByName({name})
      return res.json(device)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async delete(req, res, next) {
    const {id} = req.params;
    try {
      const device = await DeviceService.getOne({id})
      await FileService.deleteFile(device.img)
      const deletedDevice = await DeviceService.delete({id});
      return res.json(deletedDevice);
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async updateRating(req, res, next) {
    let {rating} = req.body
    const {id} = req.params
    try {
      await DeviceService.updateDeviceRating({id, rating})
      return res.status(200).send();
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new DeviceController() 