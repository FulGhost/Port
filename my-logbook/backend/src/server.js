import express from 'express';
import logRoutes from './routes/logRoutes.js'

const app = express()
const PORT = process.env.PORT || 7000


// Middleware
app.use(express.json())


app.use('/api', logRoutes)


app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`)
})
