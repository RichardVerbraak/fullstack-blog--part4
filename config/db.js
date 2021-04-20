const mongoose = require('mongoose')

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		})

		if (process.env.NODE_ENV === 'development') console.log('connected')
	} catch (error) {
		if (process.env.NODE_ENV === 'development') console.error(error)
	}
}

module.exports = connectDB
