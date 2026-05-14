import express from 'express';
import logRoutes from './routes/logRoutes.js'

const app = express()
const PORT = 9000


// Middleware
app.use(express.json())

app.get('/', (req, res) => {
  console.log('We Up')
 res.sendStatus(200)
})

app.use('/api', logRoutes)

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`)
})
