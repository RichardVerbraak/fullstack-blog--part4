const Blog = require('../models/blogModel')

const getAllBlogs = async (req, res) => {
	
	const blogs = await Blog.find({})

	res.json(blogs)	
}

const addNewBlog = (req, res) => {
	const blog = new Blog(request.body)

	await blog.save()
	
	response.status(201).json(blog)
}

module.exports = { getAllBlogs, addNewBlog }
