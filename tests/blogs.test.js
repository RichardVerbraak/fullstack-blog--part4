const { dummy, totalLikes } = require('../utils/list_helper')

test('dummy returns one', () => {
	const blogs = []

	const result = dummy(blogs)
	expect(result).toBe(1)
})

describe('total likes', () => {
	const blogs = [
		{
			title: 'At the Mountains of Madness',
			author: 'H.P. Lovecraft',
			url: 'something.something.com',
			likes: 4,
		},
		{
			title: 'Dagon',
			author: 'H.P. Lovecraft',
			url: 'something.something.com',
			likes: 6,
		},
	]

	test('of an array with two blogs', () => {
		expect(totalLikes(blogs)).toBe(10)
	})
})
