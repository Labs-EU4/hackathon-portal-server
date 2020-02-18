const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'hackton',
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 300, height: 300, crop: 'scale' }]
});

const imageFilter = (req, file, cb) => {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error('Only image files are allowed!').toString(), false);
  }

  return cb(null, true);
};

const upload = multer({ storage, fileFilter: imageFilter });

module.exports = upload;
