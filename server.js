const express = require('express')
const http = require('http')
const connectDB = require('./config/db')
const cors = require('cors')
const dotenv = require('dotenv')
const blogRoutes = require('./routes/blogRoutes')
const userRoutes = require('./routes/userRoutes')
const errorHandler = require('./middleware/errorMiddleware')
const tokenExtractor = require('./middleware/tokenMiddleware')
const userExtractor = require('./middleware/userMiddleware')

const app = express()

dotenv.config()

connectDB()

app.use(cors())
app.use(express.json())

app.use(tokenExtractor)

app.use('/api/blogs', userExtractor, blogRoutes)
app.use('/api/users', userRoutes)

app.use(errorHandler)

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
