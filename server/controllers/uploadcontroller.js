const cloudinary = require("../utils/cloudinary");
const streamifier = require("streamifier");

exports.uploadImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ status: "error", message: "No files uploaded" });
    }

    const uploadPromises = req.files.map(
      (file) =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "listings" }, // optional folder in your Cloudinary account
            (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url); // return the secure_url
            }
          );
          streamifier.createReadStream(file.buffer).pipe(stream);
        })
    );

    const urls = await Promise.all(uploadPromises);

    res.status(200).json({ status: "success", urls });
  } catch (err) {
    next(err);
  }
};
