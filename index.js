const express = require('express')
const app = express()
const port = 5000
const dynosaursRoutes = require('./routes/dynosaurs')

// connection to db
require('./models/index')


app.use(express.json())
app.use('/dynosaurs', dynosaursRoutes)

app.listen(port, (req, res) => {
  console.log(`Running on port ${port}`)
})