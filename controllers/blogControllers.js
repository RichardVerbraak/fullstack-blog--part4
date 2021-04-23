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

const deleteBlog = async (req, res, next) => {
	const id = req.params.id

	try {
		const deletedBlog = await Blog.findByIdAndDelete(id)
		res.status(204)
		res.send(deletedBlog)
	} catch (error) {
		res.status(400)
		next(error)
	}
}

const updateBlog = async (req, res, next) => {
	const id = req.params.id
	const { title, author, url, likes } = req.body

	try {
		const blog = await Blog.findById(id)

		blog.title = title || blog.title
		blog.author = author || blog.author
		blog.url = url || blog.url
		blog.likes = likes || blog.likes

		const updatedBlog = await blog.save()

		res.status(202)
		res.send(updatedBlog)
	} catch (error) {
		res.status(400)
		next(error)
	}
}

module.exports = { getAllBlogs, addNewBlog, deleteBlog, updateBlog }
