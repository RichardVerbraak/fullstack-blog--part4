const User = require('../models/userModel.js')

const createUser = async (req, res, next) => {
	try {
		const { username, name, password } = req.body

		const user = await User.create({ username, name, password })

		res.send(user)
	} catch (error) {
		res.status(400)
		next(error)
	}
}

const getAllUsers = async (req, res) => {
	try {
		const users = await User.find({})

		res.status(200)
		res.send(users)
	} catch (error) {
		res.json(error)
		console.error(error)
	}
}

module.exports = { createUser, getAllUsers }
