const express = require('express')
const { createUser, getAllUsers } = require('../controllers/userController')

const router = express.Router()

router.get('/', getAllUsers)
router.post('/', createUser)

module.exports = router
