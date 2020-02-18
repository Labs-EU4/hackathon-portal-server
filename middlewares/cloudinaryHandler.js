const cloudinary = require('cloudinary');

module.exports = {
  async deleteCloudImage(prevAvatar) {
    if (prevAvatar) {
      try {
        const deleteCloudImage = await cloudinary.uploader.destroy(
          prevAvatar.public_id
        );
        return deleteCloudImage;
      } catch (error) {
        return error.message;
      }
    }
  }
};
