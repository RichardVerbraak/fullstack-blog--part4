const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const userExtractor = async (req, res, next) => {
	if (req.token) {
		const decoded = jwt.verify(req.token, process.env.TOKEN_SECRET)

		req.user = await User.findById(decoded.id)
	}

	next()
}

module.exports = userExtractor
