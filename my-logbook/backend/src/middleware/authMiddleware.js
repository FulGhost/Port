import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js'

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not set')
  }

  return process.env.JWT_SECRET
}

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')

    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({message: 'Authorization token is required'})
    }

    const jwtToken = token.split(' ')[1]
    const payload = jwt.verify(jwtToken, getJwtSecret())
    const organisationId = payload.organisationId || payload.id

    if (!organisationId) {
      return res.status(401).json({message: 'Invalid authorization token'})
    }

    const organisation = await prisma.organisation.findUnique({
      where: {
        id: organisationId
      },
      select: {
        id: true,
        username: true,
        email: true
      }
    })

    if (!organisation) {
      return res.status(401).json({message: 'Organisation not found'})
    }

    req.organisation = organisation
    next()
  } catch (error) {
    return res.status(401).json({message: 'Invalid or expired token'})
  }
}

export default authMiddleware
