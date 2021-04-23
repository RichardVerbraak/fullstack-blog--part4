const express = require('express')
const {
	getAllBlogs,
	addNewBlog,
	deleteBlog,
} = require('../controllers/blogControllers')

const router = express.Router()

router.get('/', getAllBlogs)

router.post('/', addNewBlog)

router.delete('/:id', deleteBlog)

module.exports = router
