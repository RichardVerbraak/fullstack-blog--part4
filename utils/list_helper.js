const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce((sum, currentBlog) => {
		return sum + currentBlog.likes
	}, 0)
}

const favoriteBlog = () => {}

module.exports = { dummy, totalLikes, favoriteBlog }
