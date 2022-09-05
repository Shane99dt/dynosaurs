const express = require('express')
const app = express()
const port = 5000
const dynosaursRoutes = require('./routes/dynosaurs')
const orderRoutes = require('./routes/order')

// connection to db
require('./models/index')


app.use(express.json())
app.use('/dynosaurs', dynosaursRoutes)
app.use('/order', orderRoutes)

app.listen(port, (req, res) => {
  console.log(`Running on port ${port}`)
})