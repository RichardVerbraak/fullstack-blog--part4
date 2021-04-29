const express = require('express')
const http = require('http')
const connectDB = require('./config/db')
const cors = require('cors')
const dotenv = require('dotenv')
const blogRoutes = require('./routes/blogRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()

dotenv.config()

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRoutes)
app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 3003

const server = http.createServer(app)

server.listen(PORT, () => {
	if (process.env.NODE_ENV !== 'test') {
		console.log(
			`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
		)
	}
})

module.exports = server
