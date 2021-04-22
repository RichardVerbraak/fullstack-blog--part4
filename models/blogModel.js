const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
})

// Returned object being the object send back as a response from mongoDB
blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
	},
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
