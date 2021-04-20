const _ = require('lodash')

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

// !!!Completing later
// const mostBlogs = () => {
// 	const blogs = [
// 		{
// 			title: 'At the Mountains of Madness',
// 			author: 'H.P. Lovecraft',
// 			url: 'something.something.com',
// 			likes: 4,
// 		},
// 		{
// 			title: 'Dagon',
// 			author: 'H.P. Lovecraft',
// 			url: 'something.something.com',
// 			likes: 6,
// 		},
// 		{
// 			title: 'Baptism of Fire',
// 			author: 'Andrzej Sapkowski',
// 			url: 'something.something.com',
// 			likes: 10,
// 		},
// 	]

// 	// Count the amount of times a author shows up
// 	// if blogs.author === blogs.author  count +1
// 	// const authorArray = blogs.map((blog) => {
// 	// 	return blog.author
// 	// })
// 	// // console.log(authorArray)

// 	const test = blogs.reduce((obj, currentBlog) => {

// 		obj[currentBlog.author] = ++obj[currentBlog.author] || 1
// 		return obj
// 	}, {})

// 	// const test = _.countBy(blogs, 'author')

// 	// const what = Object.keys(test).reduce((a, b) => {
// 	// 	return test[a] > test[b] ? test : test
// 	// })

// 	// console.log(Object.keys(test))
// 	// console.log(test)
// }

module.exports = { dummy, totalLikes, favoriteBlog }
