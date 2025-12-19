const express = require("express");
const cors = require("cors");
const fs = require("fs");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

/* ---------------- GET EMPLOYEES ---------------- */
app.get("/api/employees", (req, res) => {
  const employees = JSON.parse(
    fs.readFileSync("./data/employees.json", "utf8")
  );
  res.json(employees);
});

/* ---------------- SEND ONBOARDING EMAIL ---------------- */
app.post("/api/send-onboarding-email", async (req, res) => {
  const { employeeId } = req.body;

  const employees = JSON.parse(
    fs.readFileSync("./data/employees.json", "utf8")
  );

  const emp = employees.find(e => e.employeeId === employeeId);
  if (!emp) return res.status(404).json({ message: "Employee not found" });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "yourgmail@gmail.com",       // 🔴 change
        pass: "your-app-password"          // 🔴 change
      }
    });

    const html = `
      <h2>Welcome ${emp.fullName}</h2>
      <p>You have joined as <b>${emp.role}</b></p>
      <p>Department: ${emp.department}</p>
      <p>Joining Date: ${emp.joiningDate}</p>
      <br/>
      <p>Regards,<br/>HR Team</p>
    `;

    await transporter.sendMail({
      from: "HR Team <yourgmail@gmail.com>",
      to: emp.email,
      subject: "Welcome to the Company",
      html
    });

    res.json({ message: "Onboarding email sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Email failed" });
  }
});

app.listen(5000, () =>
  console.log("✅ Backend running on http://localhost:5000")
);

