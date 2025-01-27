const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

exports.storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "blogme_profile",
    allowed_formats: ["jpeg", "png", "jpg"],
  },
});
exports.postStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "blogme_post",
    allowed_formats: ["jpeg", "png", "jpg"],
  },
});
