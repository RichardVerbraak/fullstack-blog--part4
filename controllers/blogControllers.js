const jwt = require('jsonwebtoken')
const Blog = require('../models/blogModel')
const User = require('../models/userModel')

const getAllBlogs = async (req, res) => {
	const blogs = await Blog.find({}).populate('user', {
		username: 1,
		name: 1,
		id: 1,
	})

	res.send(blogs)
}

// Could refactor the authentication process into it's own middleware
const addNewBlog = async (req, res, next) => {
	try {
		const { title, author, url, likes } = req.body

		let token

		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			try {
				token = req.headers.authorization.split(' ')[1]

				const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

				const user = await User.findById(decoded.id)

				const blog = new Blog({ title, author, url, likes, user })

				user.blogs = [...user.blogs, blog]

				const savedBlog = await blog.save()
				await user.save()

				res.status(201)
				res.json(savedBlog)
			} catch (error) {
				res.status(401)
				res.json({ message: 'Invalid token' })
			}
		}
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
