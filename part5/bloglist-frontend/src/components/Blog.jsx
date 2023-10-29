import { useState } from 'react'
const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [blogSet, setBlogSet] = useState(blog)
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const buttonLabel = visible ? 'hide' : 'view'

  const increaseLike = () => {
    const newBlog = ({
      ...blog,
      likes: blog.likes + 1
    })
    updateBlog(newBlog)
    setBlogSet(newBlog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>{blogSet.likes} <button onClick={increaseLike}>like</button></p>
        <button  onClick={() => deleteBlog(blog)}>remove</button>
      </div>
    </div>


  )
}

export default Blog