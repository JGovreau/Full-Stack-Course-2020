const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => {    
    return total + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((favoriteBlog, currentBlog) => {
    if (Object.keys(favoriteBlog).length === 0) { return currentBlog }
    return currentBlog.likes > favoriteBlog.likes
      ? currentBlog
      : favoriteBlog
  }, {})
}

const mostBlogs = (blogs) => {
  // Lodash countby to get object with author:count entries
  const authors = _.countBy(blogs, 'author')

  // Reduce author:count object to get author name with most blogs
  authorWithMostBlogs = Object.keys(authors).reduce((maxAuthor, author) => {
    if (Object.keys(maxAuthor).length === 0) { return author }
    return authors[author] > authors[maxAuthor]
      ? author
      : maxAuthor
  }, "")

  return {
    author: authorWithMostBlogs,
    blogs: authors[authorWithMostBlogs]
  }

}

const mostLikes = (blogs) => {
  authors = {}

  blogs.forEach((blog) => {
    if (authors[blog.author]) {
      authors[blog.author] += blog.likes
    }
    else {
      authors[blog.author] = blog.likes
    }
  })

  // Reduce author:likes object to get author name with most likes
  authorWithMostLikes = Object.keys(authors).reduce((maxAuthor, author) => {
    if (Object.keys(maxAuthor).length === 0) { return author }
    return authors[author] > authors[maxAuthor]
      ? author
      : maxAuthor
  }, "")  

  return {
    author: authorWithMostLikes,
    likes: authors[authorWithMostLikes]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}