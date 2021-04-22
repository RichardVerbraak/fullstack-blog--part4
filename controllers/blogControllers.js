const Blog = require('../models/blogModel')

const getAllBlogs = async (req, res) => {
	const blogs = await Blog.find({})

	res.json(blogs)
}

const addNewBlog = async (req, res) => {
	const blog = new Blog(req.body)

	await blog.save()

	res.status(201).json(blog)
}

module.exports = { getAllBlogs, addNewBlog }
