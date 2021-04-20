const app = require('../server')
const supertest = require('supertest')
const { dummy, totalLikes, favoriteBlog } = require('../utils/list_helper')
const mongoose = require('mongoose')

const api = supertest(app)

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

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

describe('Find the most liked blog', () => {
	test('out of 3 blogs', () => {
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
			{
				title: 'Baptism of Fire',
				author: 'Andrzej Sapkowski',
				url: 'something.something.com',
				likes: 10,
			},
		]

		expect(favoriteBlog(blogs)).toEqual(10)
	})
})

afterAll(() => {
	mongoose.connection.close()
})
