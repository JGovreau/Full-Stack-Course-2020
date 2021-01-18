import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'


const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <td><b>Title</b></td>
            <td><b>Likes</b></td>
            <td><b>Author</b></td>
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </td>
              <td>
                {blog.likes}
              </td>
              <td>
                {blog.author}
              </td>
            </tr>
          )}
        </tbody>

      </Table>
      
    </div>
  )
}

export default BlogList