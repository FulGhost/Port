import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from "crypto";
import { sendResetEmail, sendVerificationEmail } from "../utils/sendEmail.js";
import prisma from '../prismaClient.js'

const router = express.Router();

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not set')
  }

  return process.env.JWT_SECRET
}

router.post('/signup', async (req, res) => {
  try {
     const {username, email, password} = req.body

     if (!email || !password || !username) {
      return res.status(400).json({message: 'Email and password are required'})
     }

     const existingOrganisation = await prisma.organisation.findUnique({
      where: {
        email
      }
     })

     if (existingOrganisation) {
      return res.status(409).json({message: 'Organisation already exists'})
     }

     const encryptedPassword = bcrypt.hashSync(password, 8)

     const verificationToken = crypto.randomBytes(32).toString("hex")

     const organisation = await prisma.organisation.create({
      data: {
        username,
        email,
        password: encryptedPassword,
        isVerified: false,
        verificationToken
      }
     })

    //  const token = jwt.sign({organisationId: organisation.id}, getJwtSecret(), {expiresIn: '1h'})
    //  res.status(201).json({
    //   token,
    //   organisation: {
    //     id: organisation.id,
    //     username: organisation.username,
    //     email: organisation.email
    //   }
    //  })

    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      message: "Account created. Please check your email to verify your account.",
    });


  } catch (err) {
    console.log(err.message)
    res.status(503).json({message: 'Could not create organisation'})
  }
})
 

router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body

    if (!email || !password) {
      return res.status(400).json({message: 'Email and password are required'})
    }

    const organisation = await prisma.organisation.findUnique({
      where: {
        email
      }
    })

    if (!organisation) {
      return res.status(404).json({message: 'Organisation not found'})
    }


      if (!organisation.isVerified) {
      return res.status(401).json({
        message: "Please verify your email before logging in. Check your inbox.",
      });
    }


    const validPassword = bcrypt.compareSync(password, organisation.password)

    if (!validPassword) {
      return res.status(401).json({message: 'Invalid email or password'})
    }

    const token = jwt.sign({organisationId: organisation.id}, getJwtSecret(), {expiresIn: '120h'})
    res.json({
      token,
      organisation: {
        id: organisation.id,
        username: organisation.username,
        email: organisation.email
      }
    })

  } catch (err) {
    console.log(err.message)
    res.status(504).json({message: 'Could not log organisation in'})
  }
})



router.get("/verify-email/:token", async (req, res) => {
  try {
    const { token } = req.params;

    // find organisation with this token
    const organisation = await prisma.organisation.findFirst({
      where: { verificationToken: token },
    });

    if (!organisation) {
      return res.status(400).json({ message: "Invalid or expired verification link" });
    }

    // mark as verified and clear token
    await prisma.organisation.update({
      where: { id: organisation.id },
      data: {
        isVerified        : true,
        verificationToken : null,
      },
    });

    // redirect to login page with success message
    res.redirect(`${process.env.APP_URL}?verified=true`);

  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ message: "Could not verify email" });
  }
});



router.post("/resend-verification", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({message: 'Email is required to send verification mail'})
    }

    const organisation = await prisma.organisation.findUnique({
      where: { email },
    });

    if (!organisation) {
      return res.status(200).json({ message: "If that email exists a new verification link has been sent" });
    }

    if (organisation.isVerified) {
      return res.status(400).json({ message: "Email is already verified" });
    }

    // generate new token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    await prisma.organisation.update({
      where: { email },
      data : { verificationToken },
    });

    await sendVerificationEmail(email, verificationToken);

    res.status(200).json({
      message: "If that email exists a new verification link has been sent",
    });

  } catch (error) {
    console.log(`"error message":${error}`)
    res.status(500).json({ message: "Could not resend verification email" });
  }
});



router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // find the organisation
    const organisation = await prisma.organisation.findUnique({
      where: { email },
    });

    // always send success even if email not found
    // prevents people from knowing which emails are registered
    if (!organisation) {
      return res.status(200).json({
        message: "If that email exists you will receive a reset link shortly",
      });
    }

    // generate random token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // set expiry to 1 hour from now
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);

    // save token to database
    await prisma.organisation.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    // send the email
    await sendResetEmail(email, resetToken);

    res.status(200).json({
      message: "If that email exists you will receive a reset link shortly",
    });

  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
});


router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password are required" });
    }

    // find organisation with this token
    const organisation = await prisma.organisation.findFirst({
      where: { resetToken: token },
    });

    // token not found
    if (!organisation) {
      return res.status(400).json({ message: "Invalid or expired reset link" });
    }

    // check token has not expired
    if (new Date() > organisation.resetTokenExpiry) {
      return res.status(400).json({ message: "Reset link has expired. Please request a new one." });
    }

    // hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // update password and clear the token
    await prisma.organisation.update({
      where: { id: organisation.id },
      data: {
        password       : hashedPassword,
        resetToken     : null,  // ← clear token after use
        resetTokenExpiry: null, // ← clear expiry after use
      },
    });

    res.status(200).json({ message: "Password reset successfully. You can now log in." });

  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
});


router.get('/scan/:organisationId', async (req, res) => {
  try {
    const { organisationId } = req.params;

    const organisation = await prisma.organisation.findUnique({
      where: {
        id: organisationId
      }
    });

    if (!organisation) {
      return res.status(400).json({message: "Invalid Qr Code"})
    }

       // generate temp token with type: visitor
    const tempToken = jwt.sign({organisationId: organisation.id, type: "Visitor"}, getJwtSecret(), {expiresIn: '15m'});

    res.status(200).json({
      tempToken,
      organisation: {
        username: organisation.username,
      }
    });
  } catch (error) {
    console.error("QR scan error:", error);
    res.status(500).json({ message: "Could not process QR code" });
  }
})

export default router;


