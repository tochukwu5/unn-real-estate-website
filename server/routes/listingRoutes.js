// const express = require("express");
// // Custom imports
// const authController = require("../controllers/authController");
// const listingController = require("../controllers/listingController");

// const router = express.Router();

// router.get("/get", listingController.getListings);
// router.get("/listing/:id", listingController.getListing);

// // PROTECTED
// router.use(authController.protect);

// router.post("/", listingController.createListing);
// router.get("/:id", listingController.getUsersListings);
// router.delete("/:id", listingController.deleteListing);
// router.put("/:id", listingController.updateListing);

// module.exports = router;

const express = require("express");
const authController = require("../controllers/authController");
const listingController = require("../controllers/listingController");
const uploadController = require("../controllers/uploadController");
const upload = require("../middleware/multer"); // <-- import multer config

const router = express.Router();

// Public GET routes
router.get("/get", listingController.getListings);
router.get("/listing/:id", listingController.getListing);

// Upload images to Cloudinary
router.post(
  "/uploads",
  upload.array("files", 6), // "files" must match FormData key in frontend
  uploadController.uploadImages
);

// Protected routes
router.use(authController.protect);

router.post("/", listingController.createListing);
router.get("/:id", listingController.getUsersListings);
router.delete("/:id", listingController.deleteListing);
router.put("/:id", listingController.updateListing);

module.exports = router;
