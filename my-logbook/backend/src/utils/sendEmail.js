import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendResetEmail(toEmail, resetToken) {
  const resetLink = `${process.env.APP_URL}/resetpassword/${resetToken}`;

  await transporter.sendMail({
    from: `"Logbook App" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Reset Your Password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
        <h2 style="color: #1a2e45;">Password Reset Request</h2>
        <p>You requested to reset your password. Click the button below:</p>
        <a 
          href="${resetLink}"
          style="
            display: inline-block;
            background: #c9a84c;
            color: #1a2e45;
            padding: 12px 28px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            margin: 16px 0;
          "
        >
          Reset Password
        </a>
        <p style="color: #888; font-size: 13px;">
          This link expires in 1 hour. If you did not request this, ignore this email.
        </p>
      </div>
    `,
  });
}

export async function sendVerificationEmail(toEmail, verificationToken) {
  const verifyLink = `${process.env.APP_URL}/auth/verify-email/${verificationToken}`;

  await transporter.sendMail({
    from   : `"Logbook App" <${process.env.EMAIL_USER}>`,
    to     : toEmail,
    subject: "Verify Your Email",
    html   : `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
        <h2 style="color: #1a2e45;">Verify Your Email</h2>
        <p>Thanks for registering. Click the button below to verify your email:</p>
        <a 
          href="${verifyLink}"
          style="
            display: inline-block;
            background: #c9a84c;
            color: #1a2e45;
            padding: 12px 28px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            margin: 16px 0;
          "
        >
          Verify Email
        </a>
        <p style="color: #888; font-size: 13px;">
          If you did not create an account, ignore this email.
        </p>
      </div>
    `,
  });
}