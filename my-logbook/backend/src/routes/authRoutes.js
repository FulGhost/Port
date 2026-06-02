import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
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

     const organisation = await prisma.organisation.create({
      data: {
        username,
        email,
        password: encryptedPassword
      }
     })

     const token = jwt.sign({organisationId: organisation.id}, getJwtSecret(), {expiresIn: '1h'})
     res.status(201).json({
      token,
      organisation: {
        id: organisation.id,
        username: organisation.username,
        email: organisation.email
      }
     })


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

    const validPassword = bcrypt.compareSync(password, organisation.password)

    if (!validPassword) {
      return res.status(401).json({message: 'Invalid email or password'})
    }

    const token = jwt.sign({organisationId: organisation.id}, getJwtSecret(), {expiresIn: '1h'})
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

export default router;


