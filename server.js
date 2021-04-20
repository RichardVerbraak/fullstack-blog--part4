const http = require('http')
const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const dotenv = require('dotenv')
const blogRoutes = require('./routes/blogRoutes')

const app = express()

dotenv.config()

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRoutes)

const PORT = process.env.PORT || 3003

app.listen(PORT, () => {
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})

module.exports = app
