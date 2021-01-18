const Blog = require('../models/blog')
const User = require('../models/user')

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

const initialUsers = [
  {
    username: "root",
    name: "root"
    //passwordHash: "root$2b$10$HCp6qP1RTmhJ.S5MkF9UKu.q93qGmqxHQDeFxzXB43mWHNngltQ2O"
  },
  {
    username: "jordan",
    name: "jordan"
    //passwordHash: "jordan$2b$10$HCp6qP1RTmhJ.S5MkF9UKu.q93qGmqxHQDeFxzXB43mWHNngltQ2O"
  }
]

module.exports = {
  initialBlogs,
  initialUsers
}