const http = require('http')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const blogRoutes = require('./routes/blogRoutes')

dotenv.config()

const app = express()

// mongoose.connect(process.env.MONGO_URI, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// 	useFindAndModify: false,
// 	useCreateIndex: true,
// })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRoutes)

const PORT = process.env.PORT || 3003

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
