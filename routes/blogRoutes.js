const express = require('express')
const {
	getAllBlogs,
	addNewBlog,
	deleteBlog,
	updateBlog,
} = require('../controllers/blogControllers')

const router = express.Router()

router.get('/', getAllBlogs)

router.post('/', addNewBlog)

router.delete('/:id', deleteBlog)

router.put('/:id', updateBlog)

module.exports = router
