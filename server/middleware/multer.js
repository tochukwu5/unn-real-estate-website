// middleware/multer.js
const multer = require("multer");

const storage = multer.memoryStorage(); // store files in memory for Cloudinary streaming
const upload = multer({ storage });

module.exports = upload;
