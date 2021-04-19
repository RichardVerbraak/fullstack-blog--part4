const express = require('express')
const { getAllBlogs, addNewBlog } = require('../controllers/blogControllers')

const router = express.Router()

router.get('/', getAllBlogs)

router.post('/', addNewBlog)

module.exports = router
