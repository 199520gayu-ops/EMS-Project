const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yourcompanyhr@gmail.com",   // HR email
    pass: "YOUR_GMAIL_APP_PASSWORD",    // App password
  },
});

async function sendOnboardingEmail({
  email,
  fullName,
  employeeId,
  department,
  joiningDate,
}) {
  const mailOptions = {
    from: '"HR Team" <yourcompanyhr@gmail.com>',
    to: email,
    subject: "🎉 Welcome to the Company!",
    html: `
      <div style="font-family: Arial; padding: 20px;">
        <h2>Welcome aboard, ${fullName}! 🎉</h2>

        <p>We are excited to have you join our organization.</p>

        <h3>Your Employee Details</h3>
        <ul>
          <li><b>Employee ID:</b> ${employeeId}</li>
          <li><b>Department:</b> ${department}</li>
          <li><b>Joining Date:</b> ${joiningDate}</li>
        </ul>

        <p>
          Our HR team will contact you with login credentials
          and further onboarding steps.
        </p>

        <p>
          If you have any questions, feel free to reach out to HR.
        </p>

        <br />
        <p>Regards,<br/><b>HR Team</b></p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendOnboardingEmail;
