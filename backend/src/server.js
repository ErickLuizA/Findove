require('dotenv').config()
const express = require('express')
const cors = require('cors')

const routes = require('./routes')

const app = express()
const port = process.env.PORT || 3333

const isProduction = process.env.NODE_ENV === 'production'
const origin = {
  origin: isProduction ? 'https://findove.herokuapp.com' : '*',
}
app.use(cors(origin))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(routes)

app.listen(port, () => console.log(`Server running on ${port}`))