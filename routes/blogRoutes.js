const express = require('express')
const {} = require('../controllers/blogControllers')

const router = express.Router()

router.get('/api/blogs')

module.exports = router
