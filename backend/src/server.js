require('dotenv').config()
const express = require('express')
const cors = require('cors')

const routes = require('./routes')

const app = express()
const port = process.env.PORT || 3333

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({
  origin: 'https://findove.netlify.app'
}))

app.use(routes)

app.listen(port, () => console.log(`Server running on ${port}`))