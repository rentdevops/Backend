const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "akacornelius50@gmail.com",
    pass: "iucb zqpw ghlz hsik",
  },
});

const main = async (email, otp) => {
  const htmlTemplate = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
      /* Add the same CSS as above */
       body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .email-header {
      background-color: #007bff;
      color: #ffffff;
      padding: 20px;
      text-align: center;
    }
    .email-header h1 {
      margin: 0;
      font-size: 24px;
    }
    .email-body {
      padding: 20px;
      color: #333333;
    }
    .email-body p {
      font-size: 16px;
      line-height: 1.5;
    }
    .email-body a {
      display: inline-block;
      margin-top: 20px;
      padding: 10px 20px;
      font-size: 16px;
      color: #ffffff;
      background-color: #007bff;
      text-decoration: none;
      border-radius: 4px;
    }
    .email-footer {
      background-color: #f4f4f4;
      text-align: center;
      padding: 10px;
      font-size: 14px;
      color: #777777;
    }
    .email-footer a {
      color: #007bff;
      text-decoration: none;
    }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        <h1>Reset Your Password</h1>
      </div>
      <div class="email-body">
        <p>We received a request to reset your password.</p>
        <p> Your one time password : ${otp}</p>
        <p> If you didn’t request a password reset, you can ignore this email. Your password will remain unchanged.</p>
      </div>
      <div class="email-footer">
        <p>&copy; 2025 nelBlob. All rights reserved.</p>
        <p><a href="#">Privacy Policy</a> | <a href="#">Contact Support</a></p>
      </div>
    </div>
  </body>
  </html>
`;

  const info = await transporter.sendMail({
    from: "akacornelius50@gmail.com", // sender address
    to: `${email}`, // list of receivers
    subject: "Reset Password", // Subject line
    html: htmlTemplate, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
};

module.exports = main;
