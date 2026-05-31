import express from 'express';
import logRoutes from './routes/logRoutes.js'
import authRoutes from './routes/authRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'

const app = express()
const PORT = process.env.PORT || 7000


// Middleware
app.use(express.json())


app.use('/auth', authRoutes)
app.use('/api', authMiddleware, logRoutes)


app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`)
})
