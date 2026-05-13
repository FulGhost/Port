import express from 'express';

const app = express()
const PORT = 9000


app.get('/', (req, res) => {
  console.log('We Up')
 res.sendStatus(200)
})

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`)
})
