const ApiError = require('../../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class FileService {
  async putFile (img) {
    try {
      let fileName = uuid.v4() + ".jpg"
      await img.mv(path.resolve(__dirname, '../../../', 'static', fileName))
      return fileName
    } catch (e) {
      throw ApiError.badRequest(e.message)
    }
  }
}

module.exports = new FileService()