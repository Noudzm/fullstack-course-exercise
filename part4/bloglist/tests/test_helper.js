const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    //   id:"123",
    title:'test1',
    author:'tester1',
    url:'https://test.com/',
    likes:1
  },
  {
    //   id:"456",
    title:'test2',
    author:'tester2',
    url:'http://test2.com',
    likes:2
  }
]


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb
}