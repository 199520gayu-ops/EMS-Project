const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// ensure uploads folder exists
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

// multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post(
  "/onboard",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "education", maxCount: 1 },
    { name: "experience", maxCount: 1 },
    { name: "salary", maxCount: 1 },
  ]),
  (req, res) => {
    try {
      console.log("✅ ONBOARD API HIT");
      console.log("BODY:", req.body);
      console.log("FILES:", req.files);

      return res.status(200).json({
        success: true,
        message: "Employee onboarded successfully",
        employeeId: "EMP-" + Date.now(),
      });
    } catch (error) {
      console.error("UPLOAD ERROR:", error);
      return res.status(500).json({
        success: false,
        message: "Upload failed",
      });
    }
  }
);

module.exports = router;


