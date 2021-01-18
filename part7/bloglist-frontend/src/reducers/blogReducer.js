import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      // Return all blogs sorted by likes
      return action.data.sort(
        (a,b) => (a.likes > b.likes) ? -1 : ((b.likes > a.likes) ? 1 : 0)
      )

    case 'CREATE_BLOG':
      // Return all blogs with new blog added to the end
      return state.concat(action.data)

    case 'DELETE_BLOG':
      const id = action.data.id

      // Return all blogs except deleted one
      return state.filter(blog => blog.id !== id)

    case 'INCREMENT_LIKES':
      const blog = action.data.incrementedBlog

      // Return blogs with incremented likes only on target blog
      return state.map(b =>
        b.id === blog.id
          ? { ...b, likes: b.likes + 1}
          : b
      ).sort( // Sort by likes after incrementing
        (a,b) => (a.likes > b.likes) ? -1 : ((b.likes > a.likes) ? 1 : 0)
      )

    case 'ADD_COMMENT':
      const commentedBlog = action.data.commentedBlog

      return state.map(b =>
        b.id === commentedBlog.id
          ? commentedBlog
          : b
      )

    default:
      return state
  }
}


// Action creator for initializing all blogs on first render
export const initializeBlogs = () => {
  return async dispatch => {

    // Get all blogs from the blog service
    const blogs = await blogService.getAll()

    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })

  }
}

// Action creator for creating a new blog
export const createBlog = (blog) => {
  return async dispatch => {

    // Blog service call for creating/posting a new blog
    const newBlog = await blogService.create(blog)

    dispatch({
      type: 'CREATE_BLOG',
      data: newBlog
    })

  }
}

// Action creator for deleting a blog
export const deleteBlog = (id) => {
  return async dispatch => {

    // Blog service call for deleting a blog by id
    await blogService.deleteBlog(id)

    dispatch({
      type: 'DELETE_BLOG',
      data: { id }
    })
  }
}

// Aciton creator for incrementing a blog's likes
export const incrementLikes = (blog) => {
  return async dispatch => {

    // Blog service call to increment a blog's likes with a PUT request
    const incrementedBlog = await blogService.incrementLikes(blog)

    dispatch({
      type: 'INCREMENT_LIKES',
      data: { incrementedBlog }
    })
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {

    console.log('in reducer', id, comment)
    const commentedBlog = await blogService.addComment(id, comment)

    dispatch({
      type: 'ADD_COMMENT',
      data: { commentedBlog }
    })
  }
}

export default blogReducer