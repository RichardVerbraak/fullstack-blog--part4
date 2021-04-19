const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce((sum, currentBlog) => {
		return sum + currentBlog.likes
	}, 0)
}

const favoriteBlog = (blogs) => {
	const likesArray = blogs.map((blog) => {
		return blog.likes
	})

	return Math.max(...likesArray)
}

module.exports = { dummy, totalLikes, favoriteBlog }
