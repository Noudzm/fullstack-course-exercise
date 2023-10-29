import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'


const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLike, setNewLike] = useState('')




  const handleTitle = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthor = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrl = (event) => {
    setNewUrl(event.target.value)
  }
  const handleLike = (event) => {
    setNewLike(event.target.value)
  }


  const addBlog = ( event ) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      likes:newLike,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewLike('')
    setNewUrl('')

  }
  return (
    <form onSubmit = {addBlog}>
      <div>
            Title:
        <input type='text' id='title'  value={newTitle} onChange={handleTitle} />
      </div>
      <div>
            Author:
        <input type="text" id='author' value={newAuthor} onChange={handleAuthor} />
      </div>
      <div>
            Like:
        <input type="text" id='like' value={newLike} onChange={handleLike} />
      </div>
      <div>
            Url:
        <input type="text" id='url' value = {newUrl} onChange={handleUrl}/>
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}
export default BlogForm
