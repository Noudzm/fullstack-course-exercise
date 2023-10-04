const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
},100000)

describe('when there is initially some blogs saved',() => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('viewing the first blog specific blog', async () => {
    const resultBlog = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const contents = resultBlog.body[0]
    expect(contents).toBe(Blog.initialBlogs[0])
  })

  test('there are two blogs', async () => {
    const resultBlog = await api
      .get('/api/blogs')

    expect(resultBlog.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the unique identifier property of the blog posts is named id', async () => {
    const blogs = await Blog.find({})
    expect(blogs[0].id).toBeDefined()
  })
})

describe ('addition of blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title:'test3',
      author:'tester3',
      url:'http://www.test3.com',
      likes:3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(b => b.title)
    expect(contents).toContain(
      'test3'
    )
  })

  test('If the likes property is missing default to 0 ', async () => {
    const newBlog = {
      title:'test4',
      author:'tester4',
      url:'http://test4.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const contents = await blogsAtEnd.find(b => b.title === 'test4')
    contents.likes = 0
    expect(contents.likes).toBe(0)
  })

  test('the backend responds with the status code 400 Bad Request,if the title or url properties are missing', async () => {
    const newBlog = {
      author:'test5',
      likes:5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

})

describe('blog change or updating', () => {

  test('updated blog ', async () => {

    const blog = {
      title:'test6',
      author:'tester6',
      url:'http://www.test6.com',
      likes:6
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(200)

    const allBlogs = await helper.blogsInDb()
    const blogToUpdate = allBlogs.find(b => b.title === blog.title)

    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const foundBlog = blogsAtEnd.find(blog => blog.likes === 7)
    expect(foundBlog.likes).toBe(7)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.notesInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blog/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.notesInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialNotes.length - 1
    )

    const contents = blogsAtEnd.map(r => r.title)

    expect(contents).not.toContain(blogToDelete.content)
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})