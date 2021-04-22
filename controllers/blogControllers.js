const Blog = require('../models/blogModel')

const getAllBlogs = async (req, res) => {
	const blogs = await Blog.find({})

	res.send(blogs)
}

const addNewBlog = async (req, res, next) => {
	const { title, author, url, likes } = req.body

	const blog = new Blog({ title, author, url, likes })

	try {
		await blog.save()
		res.status(201).json(blog)
	} catch (error) {
		res.status(400)
		next(error)
	}
}

module.exports = { getAllBlogs, addNewBlog }
