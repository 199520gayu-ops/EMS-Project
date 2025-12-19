const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("./utils/sendEmail");
const generateOfferLetter = require("./utils/generateOfferLetter");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `uploads/${file.fieldname}`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.post(
  "/api/onboard",
  upload.fields([
    { name: "resume" },
    { name: "education" },
    { name: "experience" },
    { name: "salary" },
  ]),
  async (req, res) => {
    try {
      const {
        fullName,
        email,
        phone,
        department,
        role,
        joiningDate,
      } = req.body;

      const employeeId = "EMP-" + uuidv4().slice(0, 6).toUpperCase();

      /* Generate Offer Letter */
      const offerPath = await generateOfferLetter({
        fullName,
        employeeId,
        department,
        role,
        joiningDate,
      });

      /* Send Email */
      await sendEmail({
        to: email,
        fullName,
        employeeId,
        offerPath,
      });

      res.json({
        success: true,
        employeeId,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false });
    }
  }
);

app.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
