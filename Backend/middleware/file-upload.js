const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../util/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "post-place-app", // your app folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const fileUpload = multer({ storage: storage });

module.exports = fileUpload;
