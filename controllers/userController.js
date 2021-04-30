const User = require('../models/userModel.js')

const createUser = async (req, res, next) => {
	try {
		const { username, name, password } = req.body

		const user = await User.create({ username, name, password })

		res.status(201)
		res.send(user)
	} catch (error) {
		res.status(400)
		next(error)
	}
}

const getAllUsers = async (req, res) => {
	try {
		const users = await User.find({}).populate('blogs', {
			url: 1,
			title: 1,
			author: 1,
			id: 1,
		})

		res.status(200)
		res.send(users)
	} catch (error) {
		res.json(error)
		console.error(error)
	}
}

module.exports = { createUser, getAllUsers }
