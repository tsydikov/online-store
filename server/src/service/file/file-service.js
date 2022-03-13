const ApiError = require('../../error/ApiError');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs')

class FileService {
  async putFile(img) {
    try {
      let fileName = uuid.v4() + '.jpg'
      await img.mv(path.resolve(__dirname, '../../../', 'static', fileName))
      return fileName
    } catch (e) {
      throw ApiError.badRequest(e.message)
    }
  }

  async deleteFile(fileName) {
    const filePath = path.resolve(__dirname, '../../../', 'static', fileName)
    await fs.unlink(filePath, (err) => {
      if (err) ApiError.badRequest(err.message)
      console.log(`${filePath} was deleted`);
    });
  }
}

module.exports = new FileService()