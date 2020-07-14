const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "First Blog",
    author:"Jordan M Govreau",
    url: "jordanblogs.com",
    likes:69420
  },
  {
    title: "Second Blog",
    author:"Jordeau",
    url: "jordeau.com",
    likes:12345
  }
]

module.exports = {
  initialBlogs
}