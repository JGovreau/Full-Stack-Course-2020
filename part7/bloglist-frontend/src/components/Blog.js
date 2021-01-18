import React, { useState } from 'react'
import { incrementLikes, addComment } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button } from 'react-bootstrap'


const Blog = ({ blog }) => {

  const [commentInput, setCommentInput] = useState('')

  const dispatch = useDispatch()
  const blogState = useSelector(state => state.blogs.find(b => b.id === blog?.id))
 
  if (!blog) {
    return null
  }


  // Function called when Like button is clicked
  const handleLike = async () => {
    dispatch(incrementLikes(blogState))
  }

  // Function to handle when Add Comment button is clicked
  const handleCommentCreation = async (event) => {
    event.preventDefault()
    dispatch(addComment(blogState.id, commentInput))
    setCommentInput('')
  }

  return (
    <div>
      <h2>{blogState.title}</h2>
      <div>URL: {blogState.url}</div>
      <div>
        Likes: {blogState.likes}
        <Button type="primary" id="likeButton" onClick={handleLike}>Like</Button>
      </div>
      <div>Author: {blogState.author}</div>

      <br />
      <h4>Comments</h4>
      <div>
        <form onSubmit={handleCommentCreation}>
        <input
          type="text"
          value={commentInput}
          name="commentInput"
          id="commentInput"
          onChange={({target}) => setCommentInput(target.value)}
        />
        <Button type="primary" id="addCommentButton">Add Comment</Button>
        </form>
      </div>

      <Table striped>
        <tbody>
          {blogState.comments.map((comment, i) =>
          <tr key={i}>{comment}</tr>
          )}
        </tbody>
      </Table>
      

    </div>
  )

}

export default Blog