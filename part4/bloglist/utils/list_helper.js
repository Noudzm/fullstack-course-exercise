const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? {}: blogs.reduce((mostlikes, currentblog) => currentblog.likes > mostlikes ? currentblog.likes : mostlikes,blogs[0].likes)
}
  
module.exports = {
  dummy, totalLikes, favoriteBlog
}