const PDFDocument = require("pdfkit");
const fs = require("fs");

module.exports = function generateOfferLetter(data) {
  return new Promise((resolve) => {
    const filePath = `uploads/letters/Offer_${data.employeeId}.pdf`;
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(18).text("OFFER LETTER", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`
Dear ${data.fullName},

We are pleased to offer you the position of ${data.role}
in the ${data.department} department.

Employee ID: ${data.employeeId}
Joining Date: ${data.joiningDate}

We look forward to having you as part of our organization.

Regards,
HR Team
    `);

    doc.end();
    resolve(filePath);
  });
};
