import React from 'react'
import { Table } from 'react-bootstrap'

const User = ({ user }) => {

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user?.name}</h2>
      <h3>Added Blogs</h3>
      <Table striped>
        <tbody>
          {user?.blogs.map(blog => 
            <tr key={blog.id}>
              {blog.title}
            </tr>
          )}
        </tbody>
      </Table>
      
    </div>
  )
}

export default User