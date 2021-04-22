const app = require('../server')
const supertest = require('supertest')
const mongoose = require('mongoose')

const Blog = require('../models/blogModel')
const { dummy, totalLikes, favoriteBlog } = require('../utils/list_helper')

const api = supertest(app)

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

beforeEach(async () => {
	// Delete previous documents
	await Blog.deleteMany({})

	// Add seeder data to test
	await Blog.insertMany(blogs)
})

describe('MongoDB blog(s)', () => {
	test('are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('have a length of 3', async () => {
		const res = await api.get('/api/blogs')
		expect(res.body).toHaveLength(3)
	})

	test('have a unique identifier', async () => {
		const res = await api.get('/api/blogs')
		expect(res.body[0].id).toBeDefined()
	})
})

test('Adds a new blog to MongoDB', async () => {
	const newBlog = {
		title: 'Season of Storms',
		author: 'Andrzej Sapkowski',
		url: 'something.something.com',
		likes: 3,
	}

	await api.post('/api/blogs').send(newBlog).expect(201)

	const res = await api.get('/api/blogs')
	expect(res.body).toHaveLength(4)
})

test('if the likes prop defaults to 0 when missing', async () => {
	const newBlog = {
		title: 'Blood of Elves',
		author: 'Andrzej Sapkowski',
		url: 'something.something.com',
	}

	await api.post('/api/blogs').send(newBlog)

	const res = await api.get('/api/blogs')
	expect(res.body[3].likes).toBe(0)
})

test('for 400 Bad Request when title and url props are missing', async () => {
	const newBlog = {
		author: 'Andrzej Sapkowski',
		likes: 23,
	}

	await api.post('/api/blogs').send(newBlog).expect(400)
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
	app.close()
})
